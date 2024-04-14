const getPhotos = objRepo => {
    const { models, s3Client } = objRepo;
    return async (req, res, next) => {
        const photos = await models.photos.findAll({ sort: { createdAt: -1 } });
        res.locals.pictures = photos.map(photo => ({
            url: photo.url,
            createdAt: photo.createdAt,
            title: photo.title,
            id: photo.id
        }));
        return next();
    };
};

module.exports = getPhotos;
