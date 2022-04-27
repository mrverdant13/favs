const express = require('express');
const { me } = require('./auth.middleware');
const { signUp, signIn, getProfile } = require('./controller');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);
router.get('/me', me, getProfile);

module.exports = router;
