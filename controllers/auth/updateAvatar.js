const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models/user');
const Jimp = require('jimp');
const avatarDir = path.join(__dirname, '../../', 'public/avatars');
const { PORT } = process.env;



const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const extention = originalname.split('.').pop();
    const fileName = `${_id}.${extention}`;
     Jimp.read(tempUpload, (err, image) => {
    if (err) throw err;
    image
        .resize(250, 250) 
        .quality(60) 
        .write(`./public/avatars/${fileName}`); 
    });
    const resultUpload = path.join(avatarDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join(`http://localhost:${PORT}/avatars`, fileName);
    await User.findByIdAndUpdate(_id, { avatarURL })
    res.json({
        avatarURL,
    })
}

module.exports = updateAvatar;