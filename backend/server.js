const express = require('express');
const mongoose = require('mongoose');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: path.join(__dirname, '../frontend') });
const handle = app.getRequestHandler();

const server = express();
const port = process.env.PORT || 5000;
const articlesRouter = require('./routes/articles');
const translationRouter = require('./routes/translation');

// Middleware
server.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/unitranslate')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// Routes
server.use('/api/articles', articlesRouter);
server.use('/api/translate', translationRouter);

app.prepare().then(() => {
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
