let express = require('express');
let router = express.Router();
let { getBook, getBookCategory, getAllBookType, getBookList, getAllBookNumber, getHotBookList, getBookChapter } = require('../models/book');

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

module.exports = router;
