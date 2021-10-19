const router = require('express').Router();
const authCheck = require('../utils/authcheck');

router.use(authCheck);

router.get('/', (req, res) => {
    res.status(202);
    res.render("prepare", { title: 'Prepare', user: req.user });
});

module.exports = router;