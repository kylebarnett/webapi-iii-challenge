const express = require('express');
const helmet = require('helmet');
const server = express();
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  let date = new Date().toISOString();
  console.log(`TIMESTAMP: [${date}] URL: ${req.url} METHOD: ${req.method} request!`);
  next();
};


module.exports = server;
