const express = require('express');
const db = require('./userDb');
const router = express.Router();

router.post('/', validatePost, (req, res) => {
  res.status(201).json(post)
});

router.post('/:id/posts', validateUserId, (req, res) => {

});

router.get('/', (req, res) => {
  const users = req.body;
  db.get(users)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving users.' })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {

});

router.put('/:id', validateUserId, (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  db.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'Invalid user id.' })
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'exception', err })
    })
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {
  const post = req.body;
  if (!post) {
    res.status(400).json({ message: 'Missing user data.' })
  } else {
    db.insert(post)
      .then(info => {
        res.status(201).json(info)
        next();
      })
      .catch(err => {
        res.status(500).json({ message: 'Error posting to user.' })
      })
  }
};

module.exports = router;
