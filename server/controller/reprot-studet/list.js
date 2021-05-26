const fs = require("fs"); //文件模块
const querySql = require("../../db/index"); //数据库配置

const main = async (req, res, next) => {
  // console.log(req.body);

  res.json({ code: 200, message: "success", data: "" });
};

module.exports = main;
