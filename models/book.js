const db = require('../db');

// 获取书籍信息
function getBook(id, callback) {
    const sql = "SELECT * FROM happyreading.book WHERE id = ?";
    db.sqlConnect(sql, [id], (err, data) => {
        callback(err, data);
    });
}

// 获取书籍分类
function getAllBookType(callback) {
    const sql = "SELECT res1.category_id, res1.type_id, res1.type, res1.type_name, res2.type_count FROM (SELECT book_category.id as category_id, book_type.id as type_id, book_type.name as type, book_type.cname as type_name FROM happyreading.book_category INNER JOIN happyreading.book_type ON book_category.id = book_type.category_id order by book_type.id) AS res1 LEFT JOIN (SELECT book_type.id as type_id, COUNT(*) as type_count FROM happyreading.book_type JOIN happyreading.book ON book_type.id = book.type group by book_type.id ORDER BY book_type.id) as res2 on res1.type_id = res2.type_id;";
    db.sqlConnect(sql, [], (err, data) => {
        callback(err, data);
    });
}

function getBookCategory(callback) {
    const sql = "SELECT * FROM happyreading.book_category";
    db.sqlConnect(sql, [], (err, data) => {
        callback(err, data);
    });
}

// 获取书籍类型
function getBookType(categoryId, callback) {
    const sql = "SELECT * happyreading._type WHERE category_id = ?";
    db.sqlConnect(sql, [categoryId], (err, data) => {
        callback(err, data);
    });
}

// 获取书籍总数
function getAllBookNumber(callback) {
    const sql = "SELECT COUNT(*) as count FROM happyreading.book";
    db.sqlConnect(sql, [], (err, data) => {
        callback(err, data[0].count);
    });
}

// 获取分类下的书籍数量
function getEachBookNumber(data, callback) {
    let { type, category } = data;
    const sql = "SELECT COUNT(*) as count FROM happyreading.book where  category = ? AND type = ?";
    db.sqlConnect(sql, [category, type], (err, result) => {
        callback(err, result);
    });
}

// 获取书籍列表
function getBookList(data, callback) {
    let { type, category, page, pageSize } = data;
    let offset = (page - 1) * pageSize;
    let sql;
    if (!category || !type) {
        sql = "SELECT * FROM happyreading.book limit ?,?";
        db.sqlConnect(sql, [offset, pageSize], (err, result) => {
            callback(err, result);
        });
    } else {
        sql = "SELECT * FROM happyreading.book WHERE category = ? AND type = ? limit ?,?";
        db.sqlConnect(sql, [category, type, offset, pageSize], (err, result) => {
            callback(err, result);
        });
    }
}

// 获取最热书籍列表
function getHotBookList(data, callback) {
    let { page, pageSize } = data;
    let offset = (page - 1) * pageSize;
    let sql = "SELECT * FROM happyreading.book ORDER BY read_time DESC limit ?,?";
    db.sqlConnect(sql, [offset, pageSize], (err, result) => {
        callback(err, result);
    });
}

// 获取书籍章节
function getBookChapter(id, callback) {
    let sql = "SELECT * FROM happyreading.chapter WHERE id = ?";
    db.sqlConnect(sql, [id], (err, result) => {
        callback(err, result);
    });
}

// 获取书籍评论
function getBookComment(id, callback) {
    let sql = "SELECT book_comment.id, book_comment.content, book_comment.to_comment_id, book_comment.comment_date, book_comment.from_region, user.name, user.avatar FROM happyreading.book_comment INNER JOIN happyreading.user ON book_comment.from_uid = user.id WHERE comment_book_id = ?";
    db.sqlConnect(sql, [id], (err, result) => {
        callback(err, result);
    });
}

// 评论书籍
function addComment(data, callback) {
    let { bookId, content, uId, toCommentId, date, region } = data;
    let sql = "INSERT INTO happyreading.book_comment(comment_book_id, content, from_uid, to_comment_id, comment_date, from_region) values (?,?,?,?,?,?);";
    db.sqlConnect(sql, [bookId, content, uId, toCommentId, date, region], (err, result) => {
        callback(err, result);
    });
}

module.exports = {
    getBook,
    getBookCategory,
    getBookType,
    getAllBookType,
    getAllBookNumber,
    getBookList,
    getHotBookList,
    getEachBookNumber,
    getBookChapter,
    getBookComment,
    addComment,
};