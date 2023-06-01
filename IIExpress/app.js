var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require('./middleware/errorHandler');
const articlesRouter = require('./routes/articles');
const queue = require('./routes/queue');
const cron = require('node-cron');
const Article = require('./models/articleModel');




var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(errorHandler);

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use('/api/articles', articlesRouter);
queue.start();

const decayFactor = 0.9;
cron.schedule('0 */4 * * *', async function() {
  console.log('Starting cron job');
  try {
    const articles = await Article.find();
    for (let article of articles) {
      const oldViewCount = article.viewCount;
      article.viewCount = Math.floor(article.viewCount * decayFactor);
      console.log(`Updating view count for article ${article.title}: ${oldViewCount} -> ${article.viewCount}`);
      await article.save();
    }
  } catch (err) {
    console.error('Error in cron job:', err);
  }
  console.log('Finished cron job');
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../IIAngular/dist/IIAngular/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
