module.exports = (req, res, next) => {
    if(req.user)
        res.status(302).redirect('/profile/'+req.user.id);
    else
        next();
}