const fs = require('fs'); //文件模块
const querySql = require('../../db/index'); //数据库配置












const main = async (req, res, next) => {
    let { ids, user } = req.body;

    let list = ids.map(item => {
        return user.find(i => i.id === item);
    })


    res.json({ code: 200, message: 'success', data: list })
}


module.exports = main