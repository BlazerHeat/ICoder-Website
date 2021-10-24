const router = require('express').Router();
const authCheck = require('../utils/authcheck');

router.use(authCheck);

router.get('/:id', (req, res) => {
   res.status(202);
   res.render("profile", { title: 'Profile', user: req.user });
});

module.exports = router;