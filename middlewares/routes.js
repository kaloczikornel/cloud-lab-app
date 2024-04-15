const render = require('./render');
const inverseAuth = require('./auth/inverseAuth');
const login = require('./auth/login');
const logout = require('./auth/logout');
const reg = require('./auth/reg');
const auth = require('./auth/auth');
const createPhoto = require('./photo/createPhoto');
const models = require('../models/db');
const getPhotos = require('./photo/getPhotos');
const { memoryStorage } = require('multer');
const multer = require('multer');
const AWS = require('aws-sdk');
const deletePhoto = require('./photo/deletePhoto');
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
const routes = app => {
    const objRepo = { models, s3Client };
    // Set storage engine for multer
    const storage = memoryStorage(); // Store the file in memory to be passed directly to S3

    // Initialize multer middleware
    const upload = multer({
        storage: storage
    });

    // Health check
    app.use('/health', (req, res, next) => res.send('OK'));

    app.use('/test', (req, res, next) => res.send('Testing'));

    app.use(
        '/register',
        inverseAuth(objRepo),
        reg(objRepo),
        render(objRepo, 'register')
    );

    app.use(
        '/login',
        inverseAuth(objRepo),
        login(objRepo),
        render(objRepo, 'index')
    );

    app.use('/logout', logout(objRepo));

    app.use(
        '/upload',
        auth(objRepo),
        upload.single('image'),
        createPhoto(objRepo),
        render(objRepo, 'upload')
    );

    app.use('/delete/photo/:id', auth(objRepo), deletePhoto(objRepo));

    app.use('/', auth(objRepo), getPhotos(objRepo), render(objRepo, 'home'));

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
