module.exports = function (objRepo) {
    return (req, res, next) => {
        if (typeof req.session.user !== 'undefined') {
            return res.redirect('/');
        }
        return next();
    };
};
