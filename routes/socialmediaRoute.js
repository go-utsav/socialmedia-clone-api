var express = require('express');
const { createpost, deletepost, list } = require('./../controller/postController')
const { login, createuser, verifyuser } = require('./../controller/loginController');



var router = express.Router();

/* GET users listing. */
router.get('/', list);
router.post('/createpost', createpost);
router.get('/deletepost', deletepost);
router.post('/login', login);
router.post('/createuser', createuser);
router.post('/verifyuser', verifyuser);

module.exports = router;
