const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { _log } = require('../utils/logging');
const { delFile } = require('../utils/helpers');

const uploader = {
    storage: function () {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                const dir = 'public/upload';
                if (!fs.existsSync(dir)) fs.mkdirSync(dir);
                cb(null, dir);
            },
            filename: async function (req, file, cb) {
                const logoPath = path.join('public/upload', 'logo.png');
                try {
                    delFile(logoPath);
                } catch (error) {
                    console.error(error);
                }
                cb(null, 'logo.png');
            },
        });
        return storage;
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|jfif|webp)$/i)) {
            return cb(new Error('Only Image file types are allowed!'), false);
        }
        cb(null, true);
    },
};

const upload = multer({
    storage: uploader.storage(),
    fileFilter: uploader.fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB
    },
});

module.exports = upload.single('file');
