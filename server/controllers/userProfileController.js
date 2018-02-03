const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');

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
  console.log(req.body);
  return res.status(200).json({ message: 'update successful' });
};
