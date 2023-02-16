const db = require('./../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');

function encryptfun(pswd) {
    return md5.update(pswd).digest('hex');
}

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
        cpassword = encryptfun(req.body.password)

        const finduser = await db.users.findOne({ where: { username: cusername } });
        if (!finduser) {
            console.log('No user found');
        } else {
            if (cpassword == finduser.password) {

                const token = jwt.sign(JSON.stringify(finduser), process.env.ACESS_KEY_SECRET);

                return res.json({
                    status: 'Success',
                    message: 'Customer Login Success',
                    data: {
                        user: finduser,
                        token: token
                    }
                });
            }

        }
        console.log('User found');
    }
    catch (e) {
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
        const newpost = await db.users.create({
            username: req.body.username,
            email: req.body.email,
            password: encryptfun(req.body.password)
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
