const express = require('express');
const { signupUser, signinUser } = require('../controllers/authControlle');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/signin', signinUser);

module.exports = {
    authRouter : router,
}