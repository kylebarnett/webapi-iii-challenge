const express = require('express');
const db = require('./userDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  res.status(201).json(user)
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
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      if (user > 0) {
        res.status(200).json({ message: 'User removed.' })
      } else {
        res.status(400).json({ message: 'Invalid user id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error removing user.' })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  db.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error updating the user.',
      });
    });
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
  const user = req.body;
  if (!user) {
    res.status(400).json({ message: 'Missing user data.' })
  } else {
    db.insert(user)
      .then(info => {
        res.status(201).json(info)
        next();
      })
      .catch(err => {
        res.status(500).json({ message: 'Error posting to user.' })
      })
  }
};

function validatePost(req, res, next) {

};

module.exports = router;
