const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  `mongodb+srv://${process.env.MongoDBUser}:${process.env.MongoDBPass}@maincluster.giandc3.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

module.exports = mongoose;