const express = require('express');
const router = express.Router();
//控制层
const list = require('../controller/reprot-studet/list');


// 创建文件
router.post('/list', list);

module.exports = router;