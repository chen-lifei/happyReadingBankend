let express = require('express');
let router = express.Router();
let { getBook, getBookCategory, getBookType, getBookList, getAllBookNumber } = require('../models/book');

router.get('/bookInfo/:id', (req, res, next) => {
    let { id } = req.params;
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

router.get('/category', (req, res, next) => {
    getBookCategory((err, data) => {
        if (err) {
            res.send({
                status: '0',
                message: '获取分类信息错误'
            });
            return;
        }
        if (data.length) {
            data.forEach((item, index) => {
                getBookType(item.id, (listErr, listData) => {
                    if (listErr) {
                        item['list'] = [];
                    } else {
                        item['list'] = listData;
                    }
                    if (index === data.length - 1) {
                        res.send({
                            status: '1',
                            result: data
                        });
                    }
                });
            });
        } else {
            res.send({
                status: '1',
                result: []
            });
        }
    });
});

module.exports = router;
