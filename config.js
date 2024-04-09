require('dotenv').config();

function parseEnvNumber(paramName, defaultValue) {
    return typeof process.env[paramName] !== 'undefined'
        ? parseInt(process.env[paramName], 10)
        : defaultValue;
}

module.exports.PORT = parseEnvNumber('PORT', 5000);

module.exports.dbconfig = {
    database: process.env.DATABASE_NAME || 'cloud-lab-app',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    host: process.env.DATABASE_HOST || 'localhost'
};
