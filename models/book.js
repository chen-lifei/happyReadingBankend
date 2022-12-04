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

// 获取书籍列表
function getBookList(data, callback) {
    let { type, category, page, pageSize } = data;
    let offset = (page - 1) * pageSize;
    let sql;
    if (!category || !type) {
        sql = "SELECT * FROM book limit ?,?";
        db.sqlConnect(sql, [offset, pageSize], (err, data) => {
            callback(err, data);
        });
    } else {
        sql = "SELECT * FROM book WHERE category = ? AND type = ? limit ?,?";
        db.sqlConnect(sql, [category, type, offset, pageSize], (err, data) => {
            callback(err, data);
        });
    }
}

function getAllBookNumber(callback) {
    const sql = "SELECT COUNT(*) as count FROM book";
    db.sqlConnect(sql, [], (err, data) => {
        callback(err, data[0].count);
    });
}

module.exports = {
    getBook,
    getBookCategory,
    getBookType,
    getBookList,
    getAllBookNumber,
};