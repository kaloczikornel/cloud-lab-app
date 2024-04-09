const getUser = require('./middlewares/user/getUser');
const routes = app => {
    const objRepo = {};

    app.use('/', (req, res, next) => {
        res.send('Hello World!');
    });
    // Health check
    app.use('/health', (req, res, next) => res.send('OK'));

    app.use('/users', getUser(objRepo));

    // Not found
    app.use((req, res) => {
        res.status(404).send('Not found');
    });

    // Error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    });
};

module.exports = routes;
