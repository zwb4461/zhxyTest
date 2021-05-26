var createError = require("http-errors");
const express = require("express");
require("express-async-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
// const env = require('../env');

const app = express();

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";
// console.log('config----', config);

//我的api
const filesRouter = require("./api/files"); //文件相关接口
const ddUserRouter = require("./api/dd-user"); //文件相关接口

const reportStudentRouter = require("./api/reprot-studet"); //报名学生

async function start() {
  const base = process.env.NODE_API_BASE;

  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // console.log('woshi1=======', base);
  // console.log('hjf=======', process.env.hjf);
  // console.log('woshi1=======', base);
  // console.log('woshi1=======', base);
  //表格表单生成
  app.use(`/${base}/files`, filesRouter);
  app.use(`/${base}/dd-user`, ddUserRouter);
  app.use(`/${base}/reprot-studet`, reportStudentRouter);

  // // console.log('nustRender---',nuxt.render);

  app.use(nuxt.render);
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  //接口全局错误捕获
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ code: err.status || 500, message: err.message || err });
  });

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
