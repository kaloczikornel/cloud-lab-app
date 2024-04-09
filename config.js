require('dotenv').config();

function parseEnvNumber(paramName, defaultValue) {
    return typeof process.env[paramName] !== 'undefined'
        ? parseInt(process.env[paramName], 10)
        : defaultValue;
}

module.exports.PORT = parseEnvNumber('PORT', 5000);