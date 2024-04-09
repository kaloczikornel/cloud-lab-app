require('dotenv').config();
const express = require('express');
const setupRoutes = require('./routes');
const { PORT } = require('./config');
const db = require('./models/db');

const isProd = process.env.NODE_ENV !== 'production';

async function main() {
    await db.sequelize.authenticate();

    let waitPromise = Promise.resolve();
    if (!isProd) {
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
    setupRoutes(app);

    app.listen(PORT || 5000, () =>
        console.log(`Listening on: ${PORT || 5000}`)
    );
}

main().catch(err => {
    console.error('Unexpected error:', err);
    process.exitCode = 1;
});
