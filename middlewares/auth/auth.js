module.exports = function (objRepo) {
    return (req, res, next) => {
        if (typeof req.session.user === 'undefined') {
            console.log('No user in session');
            return res.redirect('/login');
        }
        res.locals.user = req.session.user;
        return next();
    };
};
