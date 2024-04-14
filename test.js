// test file to test the connection to s3
const s3 = require('./config').s3;
const AWS = require('aws-sdk');
const credentials = new AWS.Credentials({
    accessKeyId: s3.accessKeyId,
    secretAccessKey: s3.secretAccessKey
});

// Set the AWS region
AWS.config.update({
    credentials: credentials,
    region: s3.region
});

const s3Client = new AWS.S3();

//list buckets
s3Client.listBuckets((err, data) => {
    if (err) {
        console.error('Error listing buckets:', err);
        console.error(err.stack);
    } else {
        console.log('Buckets:', data.Buckets);
    }
});
