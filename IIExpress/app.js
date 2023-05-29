var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

// Mongoose setup and connection string
mongoose.connect(`mongodb+srv://${process.env.MongoDBUser}:${process.env.MongoDBPass}@maincluster.giandc3.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

  //Schema for post request
  const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    imageUrl: String, // New field for image URL
    tags: [String], 
    date: { type: Date, default: Date.now }
    // Add more fields as needed
  });
  // Mongodb article model
  const Article = mongoose.model('Article', articleSchema);  


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Define API routes here
// For example:
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.json(article);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.post('/api/articles', (req, res) => {
  const { title, content, imageUrl, tags } = req.body;

  // Check if title and content are not empty
  if (!title || !content) {
    res.status(400).send('Title and content are required.');
    return;
  }

  // Create a new article with the request body
  const article = new Article({ title, content, imageUrl, tags });

  // Save the new article to the database
  article.save()
    .then(() => res.status(201).send())
    .catch(err => res.status(500).send(err));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../IIAngular/dist/IIAngular/index.html'));
});

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
