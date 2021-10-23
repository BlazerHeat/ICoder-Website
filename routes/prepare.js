const router = require('express').Router();
const authCheck = require('../utils/authcheck');

router.use(authCheck);

function getBadges(user){
    const { javaPoints, cppPoints, pythonPoints } = user;
    const badges = { javaBadge: javaPoints, cppBadge: cppPoints, pythonBadge: pythonPoints };

    Object.keys(badges).forEach(key => {
        const value = badges[key];
        if(value >= 100)
            badges[key] = 'gold';
        else if (value >= 50)
            badges[key] = 'silver';
        else
            badges[key] = 'bronze';
    });

    return badges;
}

router.get('/', (req, res) => {
    const badges = getBadges(req.user)

    res.status(202);
    res.render("prepare", { title: 'Prepare', user: req.user, ...badges });
});

module.exports = router;