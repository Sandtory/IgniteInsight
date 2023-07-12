const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Article = require('../models/articleModel'); // replace with the path to your Article model

async function generateArticles(numArticles) {
  for (let i = 0; i < numArticles; i++) {
    const article = new Article({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(20).replace(/\n/g, '</p><p>'),
      imageUrl: faker.image.nature(640, 480, true),
      tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      date: faker.date.past(),
      viewCount: Math.floor(Math.random() * 100), // random view count between 0 and 100
    });

    await article.save();
  }
}

mongoose.connect(`mongodb+srv://${process.env.MongoDBUser}:${process.env.MongoDBPass}@maincluster.giandc3.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    generateArticles(100) // generate 100 articles
      .then(() => {
        console.log('Finished generating articles');
        mongoose.disconnect();
      });
  })
  .catch(err => console.error('Could not connect to MongoDB', err));
