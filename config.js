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
    password: process.env.DATABASE_PASSWORD || '',
    host: process.env.DATABASE_HOST || 'localhost'
};

module.exports.s3 = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET_NAME,
    keyPrefix: process.env.S3_KEY_PREFIX
};
