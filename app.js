require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { checkAuth } = require('./helpers/jwtHelper');
const path = require('path');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
}));

// dev dependencies
if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

// routes
const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/videos');
const discussionRoutes = require('./routes/discussion');

app.use('/api/auth', authRoutes);
app.use('/api/videos', checkAuth, coursesRoutes);
app.use('/api/discuss', discussionRoutes);

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  require('./db');

  if ('development' === process.env.NODE_ENV) {
    console.log(`Listening on port ${PORT}`);
  }
});
