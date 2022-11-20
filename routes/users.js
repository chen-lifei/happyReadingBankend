let express = require('express');
let router = express.Router();
let { addUser, getUserNumByAccount, getUserById, userLogin } = require('../models/user');

router.get('/:id', (req, res, next) => {
    let { id } = req.params;
    getUserById(id, (err, data) => {
        if (err) {
            res.send({
                status: '0',
                message: '获取用户信息错误'
            });
            return;
        }
        if (data[0]) {
            res.send({
                status: '1',
                result: data[0]
            });
        } else {
            res.send({
                status: '0',
                message: '不存在该用户'
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    let { account, password } = req.body;
    let user = {
        account,
        password
    }
    userLogin(user, (err, data) => {
        if (err) {
            res.send({
                status: '0',
                message: '获取用户登录信息错误'
            });
            return;
        }
        if (data[0]) {
            res.send({
                status: '1',
                result: data[0]
            });
        } else {
            res.send({
                status: '0',
                message: '账号或密码输入错误'
            });
        }
    })
});

router.post('/register', (req, res) => {
    let { name, password, account } = req.body;
    let user = {
        name,
        password,
        account
    };
    getUserNumByAccount(account, (err, data) => {
        if (err) {
            res.send({
                status: '0',
                message: '查找账号信息错误'
            });
            return;
        }
        let isNewAccount = data[0].num === 0;
        if (isNewAccount) {
            addUser(user, (err, addData) => {
                if (err) {
                    console.log(err);
                    res.send({
                        status: '0',
                        message: '注册失败'
                    });
                    return;
                }
                res.send({
                    status: '1',
                    result: addData,
                    message: '注册成功'
                });
            });
        } else {
            res.send({
                status: '0',
                message: '该账号已被注册'
            });
        }
    });
});

module.exports = router;
