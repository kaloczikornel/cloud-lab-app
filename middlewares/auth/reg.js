const bcrypt = require('bcrypt');

const reg = objRepo => {
    const { models } = objRepo;
    return async (req, res, next) => {
        console.log(req.body);
        const { name, password, email, confirmPassword } = req.body;
        if (!name || !password || !email) {
            return next();
        }

        const existingUser = await models.users.findOne({ where: { name } });
        if (existingUser) {
            res.locals.error = 'User with this name already exists!';
            return next();
        }

        const existingEmail = await models.users.findOne({ where: { email } });
        if (existingEmail) {
            res.locals.error = 'User with this email already exists!';
            return next();
        }

        if (password !== confirmPassword) {
            res.locals.error = 'Passwords do not match!';
            return next();
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        req.session.user = await models.users.create({
            name,
            password: hashedPassword,
            email
        });
        return req.session.save(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/home');
        });
    };
};

module.exports = reg;
