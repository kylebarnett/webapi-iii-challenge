const express = require('express');
const router = express.Router();
const db = require('./postDb');

router.get('/', (req, res) => {
  const data = req.body;
  db.get(data)
    .then(info => {
      res.status(200).json(info)
    })
    .catch(err => {
      res.status(500).json({ error: 'Error receiving posts.' })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(info => {
      if (info > 0) {
        res.status(200).json({ message: 'Post deleted.' })
      } else {
        res.status(404).json({ message: 'Post could not be found.' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error removing post.' })
    })
});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  db.getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next()
      } else {
        res.status(400).json({ message: 'Post does not exist.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Validate post error.', err })
    })
};

module.exports = router;