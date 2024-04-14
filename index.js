require('dotenv').config();
const express = require('express');
const setupRoutes = require('./middlewares/routes');
const { PORT } = require('./config');
const db = require('./models/db');
const session = require('express-session');

const isProd = process.env.NODE_ENV === 'production';

async function main() {
    await db.sequelize.authenticate();

    let waitPromise = Promise.resolve();
    if (isProd) {
        waitPromise = db
            .syncByHand()
            .then(() => {
                console.log('DB sync done.');
            })
            .catch(err => {
                console.error('DB sync error:', err);
                process.exit(-1);
            });
    } else {
        console.log('DB sync skipped');
    }

    await waitPromise;

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname));
    app.set('view engine', 'ejs');
    app.use(
        session({
            secret: 'ADFBWRTBW§234234DFBSE2342342SDADFBSDFGb',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        })
    );
    setupRoutes(app);

    app.listen(PORT || 5000, () =>
        console.log(`Listening on: ${PORT || 5000}`)
    );
}

main().catch(err => {
    console.error('Unexpected error:', err);
    process.exitCode = 1;
});
