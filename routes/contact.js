const router = require('express').Router();
const contactMessages = require('../database/models/contactMessage');

router.get('/', (req, res) => {
    res.status(202).render('contact', { title: 'Contact', user: req.user, submitted: false });
});
router.post('/', async (req, res) => {

    const { name , email, message } = req.body;
    try {
        await new contactMessages({name, email, message}).save();
    } catch (err) {
        res.status(502).render('error', { errorText: 'Internal Server Error!'});
        return;
    }

    res.status(202).render('contact', { title: 'Contact', user: req.user, submitted: true });
});

module.exports = router;