const AWS = require('aws-sdk');
const s3 = require('../config').s3;

// Set your AWS credentials
const credentials = new AWS.Credentials({
    accessKeyId: s3.accessKeyId,
    secretAccessKey: s3.secretAccessKey
});

// Set the AWS region
AWS.config.update({
    credentials: credentials,
    region: s3.region
});

// Create an S3 instance
const s3Client = new AWS.S3();

async function uploadObject(bucketName, key, body) {
    try {
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: body
        };

        const data = await s3Client.upload(params).promise();
        console.log('Object uploaded successfully:', data.Location);
    } catch (err) {
        console.error('Error uploading object:', err);
    }
}

async function deleteObject(bucketName, key) {
    try {
        const params = {
            Bucket: bucketName,
            Key: key
        };

        await s3Client.deleteObject(params).promise();
        console.log('Object deleted successfully:', key);
    } catch (err) {
        console.error('Error deleting object:', err);
    }
}

async function getObject(bucketName, key) {
    try {
        const params = {
            Bucket: bucketName,
            Key: key
        };

        const data = await s3Client.getObject(params).promise();
        console.log('Object retrieved successfully:', data.Body.toString());
    } catch (err) {
        console.error('Error getting object:', err);
    }
}
