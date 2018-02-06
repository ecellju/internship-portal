const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');
const UserModel = require('mongoose').model('User');

exports.uploadCV = (req, res) => {
  console.log('Upload cv end point');
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename) => {
    const saveTo = path.join('.', filename);
    console.log(`Uploading: ${saveTo}`);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', () => {
    console.log('Upload complete');
    res.writeHead(200, { Connection: 'close' });
    res.end('Upload Done!');
  });
  return req.pipe(busboy);
};

exports.saveProfile = (req, res) => {
  console.log(req.body.userId);
  UserModel.findByIdAndUpdate(
    req.body.userId, { $set: { profile: req.body.profile } },
    (err, docs) => {
      if (err || !docs) return res.status(200).json({ message: docs });
      return res.status(200).json({ message: 'Profile updated' });
    },
  );
};

exports.getProfile = (req, res) => {
  console.log(req.query);
  UserModel.findById({ _id: req.query.userId }, (err, docs) => {
    if (err || !docs) res.status(200).json({ message: 'database error' });
    else { res.status(200).json(docs.profile); }
  });
};

