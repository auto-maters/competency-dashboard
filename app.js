const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

if (app.get('env') === 'development') {
  /* eslint-disable global-require */
  require('dotenv').config();
}

const indexRouter = require('./lib/routes/index');
const dataRouter = require('./lib/routes/data');
const reportsRouter = require('./lib/routes/reports');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json({ limit: '20MB' }));
app.use(express.urlencoded({ limit: '20MB', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'lib/public')));

// All server based routes
app.use('/', indexRouter);
app.use('/data', dataRouter);
app.use('/reports', reportsRouter);

// This route enables HTML5Mode by forwarding missing files to the index.html
app.all('/*', (req, res) => {
  res.sendFile('index.html', { root: 'views' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
