const express = require('express');
const authControllers = require('../controllers/auth-controllers');

const router = express.Router();


router.get('/signup', authControllers.getHome);

router.get('/login', authControllers.getLogin);

router.post('/signup', authControllers.userSignup);

router.post('/login', authControllers.userLogin);

router.post('/logout', authControllers.userLogout);

module.exports = router;
