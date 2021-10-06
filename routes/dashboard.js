const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(req.user && Object.keys(req.user).length > 0) next();
    else {
        res.status(302);
        res.redirect('/auth');
    }
}

router.use(authCheck);

router.get('/', (req, res) => {
   res.status(202);
   res.render("dashboard", { title: 'Dashboard', user: req.user });
});

module.exports = router;