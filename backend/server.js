const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();
const port = process.env.PORT || 5000;
const articlesRouter = require('./routes/articles');
const translationRouter = require('./routes/translation');

// Middleware
server.use(express.json());
server.use(cors({ origin: 'https://uni-translate.vercel.app' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/unitranslate')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// Routes
server.use('/api/articles', articlesRouter);
server.use('/api/translate', translationRouter);

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Backend server ready on port ${port}`);
});
