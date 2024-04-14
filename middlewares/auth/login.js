const bcrypt = require('bcrypt');

const login = objRepo => {
    const { models } = objRepo;
    return async (req, res, next) => {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            // res.locals.error = 'Missing username or password!';
            return next();
        }

        const existingUser = await models.users.findOne({ where: { email } });
        if (!existingUser) {
            res.locals.error = 'User does not exist with the provided email!';
            return next();
        }

        const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!passwordMatch) {
            res.locals.error = 'Incorrect password!';
            return next();
        }

        //create session
        req.session.user = existingUser;
        return req.session.save(err => {
            if (err) {
                console.log('Session save error:', err);
                return next(err);
            }
            console.log('User logged in:', existingUser.name);
            return res.redirect('/');
        });
    };
};

module.exports = login;
