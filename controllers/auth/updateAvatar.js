const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models/user');

const avatarDir = path.join(__dirname, '../../', 'public/avatars');

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(avatarDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', originalname);
    await User.findByIdAndUpdate(_id, { avatarURL })
    res.json({
        avatarURL,
    })
}

module.exports = updateAvatar;