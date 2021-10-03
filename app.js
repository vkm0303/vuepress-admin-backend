/*
 * @Description: 
 * @Author: AmsChen
 * @Date: 2021-04-04 10:53:33
 * @LastEditors: AmsChen
 * @LastEditTime: 2021-04-04 16:20:28
 * @FilePath: \hexo后台管理系统\Backend\app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session');
var cors = require('cors');

const { imagePath } = require('./config');

// 设置端口号
var ServerConf = require("./ServerConf");

var usersRouter = require('./routes/user');
var postsRouter = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(imagePath));

//使用cors工具，后端代理，解决跨域
app.use(cors());

//设置cookie-session
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use('/api/user', usersRouter);
app.use('/api/article', postsRouter);

process.env.PORT = ServerConf.ServicePort;
var port = process.env.PORT || 3000;
app.listen(port);
console.log('port:', port);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

