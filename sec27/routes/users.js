const express = require('express');
const multer = require('multer');
const db = require('../data/database');
const router = express.Router();

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now()+ '-' + file.originalname);
  }
})

const uploadMiddle = multer({ storage:  storageConfig });

router.get('/', async function(req, res) {
  const profiles = await db.getDb().collection('profiles').find({}).toArray();
  res.render('profiles', {allProfiles: profiles});
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles', uploadMiddle.single('image'), function(req, res) {
  const uploadedImage = req.file;
  const userData = req.body;
  db.getDb().collection('profiles').insertOne({
    name: userData.username,
    imagePath: uploadedImage.path
  });
  res.redirect('/')
});

module.exports = router;