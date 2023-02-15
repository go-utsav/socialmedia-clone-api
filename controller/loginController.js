const db = require('./../models');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

/**
 * login
 * @param {*} req
 * @param {*} res
 * @return 
 */

exports.login = async function (req, res) {
    try {
        cusername = req.body.username;
        cpassword = req.body.password;

        const finduser = await db.users.findOne({ where: { username: cusername, password: cpassword } });
        const token = jwt.sign(JSON.stringify(finduser), process.env.ACESS_KEY_SECRET);

        console.log(finduser);

        if (cusername == finduser.username && cpassword == finduser.password) {
            return res.json({
                status: 'success',
                message: 'Login successful',
                data: {
                    user: finduser,
                    token: token
                }
            });
        }

    } catch (e) {
        console.log(e);

        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}

/**
 * decrypt User with token
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

exports.verifyuser = async function decryptuser(req, res) {
    try {

        const token = req.headers.authorization.split(' ')[1];
        console.log(token);

        const verify = jwt.verify(token.toString(), process.env.ACCESS_KEY_TOKEN);


        return res.json({
            status: 'success',
            message: 'token authentication successful',
            data: {
                user: verify,
                token: token
            }
        });

    } catch (e) {
        console.log(e);

        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}

/**
 * create a post in  user_posts model table
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.createuser = async function createuser(req, res) {
    try {

        const salt = await bcrypt.genSalt(10);
        const newpost = await db.users.create({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt)
        })

        const token = jwt.sign(JSON.stringify(newpost), process.env.ACESS_KEY_SECRET);

        return res.json({
            status: 'success',
            message: 'new post created successfully',
            data: {
                user: newpost,
                token: token
            }
        })
    } catch (e) {
        console.log(e);

        return res.json({
            status: 'error',
            message: 'internal server error',
        });
    }
}
