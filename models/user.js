const db = require('../db');

// 添加用户数据
function addUser(user, callback) {
    let isPhone = true;
    let insertUserSql = "INSERT INTO user(name,password,phone) VALUES(?,?,?)";
    if(!isPhone) insertUserSql = "INSERT INTO user(name,password,email) VALUES(?,?,?)";

    db.sqlConnect(insertUserSql, [user.name, user.password, user.account], (err, result) => {
        callback(err, result);           
    });
};

// 根据账号得到用户数量
function getUserNumByAccount(account, callback) {
    let isPhone = true;
    let getUserNumByAccountSql = "SELECT COUNT(1) AS num FROM user WHERE phone = ?";
    if (!isPhone) getUserNumByAccountSql = "SELECT COUNT(1) AS num FROM user WHERE email = ?";

    db.sqlConnect(getUserNumByAccountSql, [account], (err, result) => {
        callback(err, result);                     
    });
};

// 根据用户 id 得到用户信息
function getUserById(id, callback) {
    let getUserByUserIdSql = "SELECT * FROM user WHERE id = ?";

    db.sqlConnect(getUserByUserIdSql, [id], (err, result) => {
        callback(err, result);                     
    });
};

// 账号密码进行登录
function userLogin(user, callback) {
    let isPhone = true;
    let userLoginSql = "SELECT * FROM user WHERE phone = ? AND password = ?";
    if (!isPhone) userLoginSql = "SELECT * FROM user WHERE email = ? AND  password = ?";

    db.sqlConnect(userLoginSql, [user.account, user.password], (err, result) => {
        callback(err, result);                     
    });
};

module.exports = {
    addUser,
    getUserNumByAccount,
    getUserById,
    userLogin
};