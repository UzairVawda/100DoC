const express = require('express');
const router = express.Router();

router.get("/", function (req, res) {
  res.status(200).render("index");
});

router.get("/recommend", function (req, res) {
  res.status(200).render("recommend");
});

router.get("/confirm", function (req, res) {
  res.status(200).render("confirm");
});

router.get("/about", function (req, res) {
  res.status(200).render("about");
});


module.exports = router