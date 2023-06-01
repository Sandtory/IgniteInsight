// queue.js

const Queue = require('bull');
const queue = new Queue('view count');

queue.process(async (job, done) => {
    const { articleId } = job.data;
  
    try {
      // Find the article in the database and increment its view count
      const article = await Article.findById(articleId);
      article.viewCount += 1;
      await article.save();
  
      done();
    } catch (err) {
      done(err);
    }
  });
  

module.exports = queue;
