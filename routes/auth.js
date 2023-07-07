const express = require('express');
const router = express.Router();
const passport = require('passport');
const antiAuthCheck = require('../utils/antiauthcheck');

const successRedirect = 'https://icoder-d9v7.onrender.com/';

router.use(antiAuthCheck);

router.get('/', (req, res) => {
    res.status(202);
    res.render('login', { title: 'Login' });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }, null));

router.get(
    '/google/callback',
    passport.authenticate(
        'google',
        {
            successRedirect: successRedirect,
            failureRedirect: '/auth/google/failure',
        },
        null
    )
);

router.get('/github', passport.authenticate('github', { scope: ['email', 'profile'] }, null));

router.get(
    '/github/callback',
    passport.authenticate(
        'github',
        {
            successRedirect: successRedirect,
            failureRedirect: '/auth/github/failure',
        },
        null
    )
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }, null));

router.get(
    '/facebook/callback',
    passport.authenticate(
        'facebook',
        {
            successRedirect: successRedirect,
            failureRedirect: '/auth/facebook/failure',
        },
        null
    )
);

module.exports = router;
