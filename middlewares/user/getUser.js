const getUser = objRepo => {
    return async (req, res, next) => {
        return res.json({id: 1, name: 'John Doe', email: 'alma@alma.hu'});
    };
};

module.exports = getUser;
