module.exports = (req, res, next) => {
    if(req.user)
        next();
    else
        res.status(302).redirect('/auth');
}