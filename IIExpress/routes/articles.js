// articles.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const articleModel = require('../models/articleModel'); // Add this line
const queue = require('./queue'); // Add this line
const rateLimit = require("express-rate-limit");

const viewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1, // limit each IP to 1 requests per windowMs
  message: "Too many view requests from this IP",
  keyGenerator: function(req) {
    // Use the IP address and the article ID as the key for rate limiting
    return req.ip + req.params.id;
  }
});

// Mongodb article model
const Article = mongoose.model("Article");

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/top', async (req, res) => {
    try {
      const articles = await Article.find().sort({ viewCount: -1 }).limit(6);
      res.json(articles);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  

router.get('/search', async (req, res) => {
  try { 
    const q = req.query.q;
    const articles = await Article.find({ $text: { $search: q } });
    res.json(articles);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.toString() });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).send("Article not found");
    }
    res.json(article);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', (req, res) => {
  const { title, content, imageUrl, tags } = req.body;

  // Check if title and content are not empty
  if (!title || !content) {
    res.status(400).send("Title and content are required.");
    return;
  }

  // Create a new article with the request body
  const article = new Article({ title, content, imageUrl, tags });

  // Save the new article to the database
  article
    .save()
    .then(() => res.status(201).send())
    .catch((err) => res.status(500).send(err));
});

router.post('/:id/views', viewLimiter, async (req, res) => {
    const articleId = req.params.id;
  
    // Find the article in the database and increment its view count
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).send("Article not found");
    }
    article.viewCount = (article.viewCount || 0) + 1;
    await article.save();
  
    res.status(200).send();
  });
  
  

module.exports = router;
