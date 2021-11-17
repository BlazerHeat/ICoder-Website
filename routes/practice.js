const router = require('express').Router();
const authCheck = require('../utils/authcheck');
const { SILVER_THRES, GOLD_THRES } = require('../config.json');

router.use(authCheck);

function getBadges(user){
    const { javaPoints, cppPoints, pythonPoints } = user;
    const badges = { javaBadge: javaPoints, cppBadge: cppPoints, pythonBadge: pythonPoints };

    Object.keys(badges).forEach(key => {
        const value = badges[key];
        if(value >= GOLD_THRES)
            badges[key] = 'gold';
        else if (value >= SILVER_THRES)
            badges[key] = 'silver';
        else
            badges[key] = 'bronze';
    });

    return badges;
}

router.get('/', (req, res) => {
    const badges = getBadges(req.user);

    res.status(202);
    res.render("practice", { title: "Practice", user: req.user, ...badges });
});

module.exports = router;