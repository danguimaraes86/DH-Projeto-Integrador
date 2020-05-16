const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usuarioRouter = require('./routes/usuario');
const homeRouter = require('./routes/home');
const postRouter = require('./routes/post');
const curtidaRouter = require('./routes/curtida');
const comentarioRouter = require('./routes/comentario');
const loginRouter = require('./routes/login');
const session = require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "veg-me",
  resave: true,
  saveUninitialized: true,
}))
app.use('/', indexRouter);
app.use('/login',loginRouter)
app.use('/usuario', usuarioRouter);
app.use('/home', homeRouter);
app.use('/post', postRouter);
app.use('/curtir', curtidaRouter);
app.use('/comentario', comentarioRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
