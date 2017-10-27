import User from '../models/user';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
  User.find().sort('-dateJoined').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
}

/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */
export function addUser(req, res) {
  if (!req.body.user.name || !req.body.user.email || !req.body.user.username || !req.body.user.password) {
    res.status(403).end();
  }

  const newUser = new User(req.body.user);

  // Let's sanitize inputs
  newUser.name = sanitizeHtml(newUser.name);
  newUser.email = sanitizeHtml(newUser.email);
  newUser.username = sanitizeHtml(newUser.username);
  newUser.password = sanitizeHtml(newUser.password);
  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user: saved });
  });
}

/**
 * Update a user
 * @param req
 * @param res
 * @returns void
 */
export function updateUser(req, res) {
  if (!req.body.user.name || !req.body.user.email || !req.body.user.username || !req.body.user.password) {
    res.status(403).end();
  }

  User.updateOne({ username: req.body.user.username }, req.body.user).exec((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ status: saved });
  });
}

/**
 * Get a single user
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  });
}

/**
 * Delete a user
 * @param req
 * @param res
 * @returns void
 */
export function deleteUser(req, res) {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    user.remove(() => {
      res.status(200).end();
    });
  });
}
