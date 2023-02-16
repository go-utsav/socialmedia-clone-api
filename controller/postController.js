const db = require('./../models');
const jwt = require('jsonwebtoken');

/**
 * create a post in  user_posts model table
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.createpost = async function (req, res) {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const verify = jwt.verify(token.toString(), process.env.ACESS_KEY_SECRET);

        if (verify) {

            const newpost = await db.user_posts.create({
                user_id: verify.id,
                title: req.body.title,
                description: req.body.description
            })

            return res.json({
                status: 'success',
                message: 'new post created successfully',
                data: newpost
            });
        } else {

            return res.json({
                status: 'error',
                message: 'please login first'
            });
        }
    } catch (e) {
        console.log(e);

        return res.json({
            status: 'error',
            message: 'internal server error',
        });
    }


}

/**
 * Delete a post in  user_posts model table
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.deletepost = async function (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token.toString(), process.env.ACESS_KEY_SECRET);

    if (verify) {

        try {

            const newpost = await db.user_posts.destroy({
                where: { id: req.query.id }
            })

            return res.json({
                status: 'success',
                message: 'your post has been deleted ',
                data: {
                    "deleted item id": req.query.id
                }
            });

        } catch (e) {
            console.log(e);

            return res.json({
                status: 'error',
                message: 'internal server error',
            });
        }
    } else {

        return res.json({
            status: 'error',
            message: 'please login first'
        });
    }

}

/**
 * get list of posts
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.list = async function (req, res) {
    try {
        const postlist = await db.user_posts.findAll({});

        return res.json({
            status: 'success',
            message: 'requested list of posts found ',
            data: postlist
        })
    } catch (e) {
        console.log(e);

        return res.json({
            status: 'error',
            message: 'internal server error',
        });
    }
}