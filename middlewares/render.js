module.exports = function (objRepo, viewName) {
    return function (req, res) {
        res.render(viewName);
    };
};
