const db = require('../db');

// 获取书籍信息
function getBook(id, callback) {
    const sql = "SELECT * FROM book WHERE id = ?";
    db.sqlConnect(sql, [id], (err, data) => {
        callback(err, data);
    });
}

// 获取书籍分类
function getBookCategory(callback) {
    const sql = "SELECT * FROM book_category";
    db.sqlConnect(sql, [], (err, data) => {
        console.log('data', data);
        callback(err, data);
    });
}

// 获取书籍类型
function getBookType(categoryId, callback) {
    const sql = "SELECT * FROM book_type WHERE category_id = ?";
    db.sqlConnect(sql, [categoryId], (err, data) => {
        callback(err, data);
    });
}

module.exports = {
    getBook,
    getBookCategory,
    getBookType,
};