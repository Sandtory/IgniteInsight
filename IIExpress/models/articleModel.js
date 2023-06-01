const mongoose = require('../routes/db.js');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  content: String,
  imageUrl: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  viewCount: { type: Number, default: 0 }, // Field for view count
});

articleSchema.index({ title: 'text', content: 'text' }, function (err) {
  if (err) {
    console.error('Failed to create index', err);
  } else {
    console.log('Successfully created index');
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
