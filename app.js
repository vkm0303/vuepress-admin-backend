var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');

const { imagePath } = require('./config');

// 设置端口号
var ServerConf = require("./ServerConf");

// 导入路由
var usersRouter = require('./routes/user');
var postsRouter = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(imagePath));

//使用cors工具，后端代理，解决跨域
app.use(cors());


app.use('/api/user', usersRouter);
app.use('/api/article', postsRouter);

process.env.PORT = ServerConf.ServicePort;
var port = 3100;
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

