let express = require('express');
let router = express.Router();
let { getBook, getBookCategory, getAllBookType, getBookList, getAllBookNumber, getHotBookList, getBookChapter, getBookComment, addComment} = require('../models/book');

router.post('/bookInfo', (req, res, next) => {
    let { id } = req.body;
    getBook(id, (err, data) => {
        if (err) {
            res.send({
                status: '0',
                message: '获取书籍信息错误'
            });
            return;
        }
        res.send({
            status: '1',
            result: data[0]
        });
    });
});

/**
 * data
 * category, type, page, pageSize
 */
router.post('/bookList', (req, res, next) => {
    let { category, type, page, pageSize } = req.body;
    page = Number(page);
    pageSize = Number(pageSize);

    getAllBookNumber((err, total) => {
        getBookList({ category, type, page, pageSize }, (err, data) => {
            if (err) {
                res.send({
                    status: '0',
                    message: '获取书籍列表错误'
                });
                return;
            }
            if (data) {
                res.send({
                    status: '1',
                    result: {
                        total,
                        page,
                        list: data,
                    }
                });
            }
        });
    });
});

/**
 * data
 * page, pageSize
 */
router.post('/hotBookList', (req, res, next) => {
    let { page, pageSize } = req.body;
    page = Number(page);
    pageSize = Number(pageSize);

    getHotBookList({ page, pageSize }, (err, data) => {
        if (err) {
            res.send({
                status: '0',
                message: '获取最热书籍列表错误'
            });
            return;
        }
        if (data) {
            res.send({
                status: '1',
                result: {
                    page,
                    list: data,
                }
            });
        }
    });
});

router.get('/type', (req, res, next) => {
    getAllBookType((err, data) => {
        if (err) {
            res.send({
                status: '0',
                message: '获取类型信息错误'
            });
            return;
        }
        if (data) {
            res.send({
                status: '1',
                result: data
            });
            
        } else {
            res.send({
                status: '1',
                result: []
            });
        }
    });

});

router.get('/category', (req, res, next) => {
    getBookCategory((err, data) => {
        if (err) {
            res.send({
                status: '0',
                message: '获取分类信息错误'
            });
            return;
        }
        if (data) {
            res.send({
                status: '1',
                result: data
            });
            
        } else {
            res.send({
                status: '1',
                result: []
            });
        }
    });
});

router.post("/chapter", (req, res, next) => {
    let { id } = req.body;
    getBookChapter(id, (err, data) => {
        if (err) {
            res.send({
                status: "0",
                message: "获取书籍章节错误"
            });
            return;
        }
        if (data) {
            res.send({
                status: "1",
                result: data
            });
        }
    });
});

router.post("/comment", (req, res, next) => {
    let { id } = req.body;
    getBookComment(id, (err, data) => {
        if (err) {
            res.send({
                status: "0",
                message: "获取书籍评论错误"
            });
            return;
        }
        if (data) {
            let list = [];
            if (data.length) {
                data.forEach(item => {
                    if (item.to_comment_id) {
                        let parentIndex = data.findIndex(pItem => pItem.id == item.to_comment_id);
                        let childComment = list[parentIndex]["childComment"];
                        childComment.push(item);
                    } else {
                        item.childComment = [];
                        list.push(item);
                    }
                });
            }
            res.send({
                status: "1",
                result: list
            });
        }
    });
});

router.post("/addComment", (req, res, next) => {
    let { bookId, content, uId, toCommentId, region, date } = req.body;
    addComment({bookId: Number(bookId), content, uId, toCommentId, region, date}, (err, data) => {
        if (err) {
            res.send({
                status: "0",
                message: "增加书籍评论错误"
            });
            return;
        }
        if (data) {
            res.send({
                status: "1",
                result: data.insertId
            });
        }
    });
});

module.exports = router;
