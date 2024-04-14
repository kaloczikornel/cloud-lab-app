const { s3 } = require('../../config');
const createPhoto = objRepo => {
    const { models, s3Client } = objRepo;
    return async (req, res, next) => {
        try {
            // Extracting title and image data from the request
            const { title } = req.body;
            const image = req.file;
            const user = req.session.user;

            if (!title || !image) {
                return next();
            }

            const key = `${s3.keyPrefix}${user.id}-${title}-${Date.now()}.png`;

            // Uploading image to S3
            const s3Params = {
                Bucket: s3.bucket,
                Key: key,
                Body: image.buffer,
                ContentType: 'image/png'
            };

            await s3Client.upload(s3Params).promise();

            // Constructing the URL of the uploaded image
            const url = `https://${s3.bucket}.s3.amazonaws.com/${key}`;

            // Saving the photo data to the database
            await models.photos.create({ title, url, user_id: user.id });

            res.redirect('/');
        } catch (error) {
            // If any error occurs, pass it to the error handling middleware
            next(error);
        }
    };
};

module.exports = createPhoto;
