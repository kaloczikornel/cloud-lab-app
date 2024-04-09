require('dotenv').config();
const express = require('express');
const setupRoutes = require('./routes');
const { PORT } = require('./config');

async function main() {
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
