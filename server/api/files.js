const express = require('express');
const router = express.Router();
//控制层
const createTableForm = require('../controller/files/create-tableForm');


// 创建文件
router.post('/create-tableForm',createTableForm);

module.exports = router;