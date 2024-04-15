const { s3 } = require('../../config');
const deletePhoto = objRepo => {
    const { models, s3Client } = objRepo;
    return async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = req.session.user;

            // Finding the photo data in the database
            const photo = await models.photos.findByPk(id);

            // If the photo doesn't exist, return
            if (!photo) {
                return next();
            }

            // If the photo doesn't belong to the user, return
            if (photo.user_id !== user.id) {
                res.locals.error = 'You are not allowed to delete this photo!';
                return next();
            }

            // Extracting the key from the URL
            const key = photo.url.split('/').pop();

            // Deleting the photo from S3
            const s3Params = {
                Bucket: s3.bucket,
                Key: key
            };

            await s3Client.deleteObject(s3Params).promise();

            // Deleting the photo from the database
            await models.photos.destroy({ where: { id } });

            res.redirect('/');
        } catch (error) {
            next(error);
        }
    };
};

module.exports = deletePhoto;
