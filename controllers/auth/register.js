const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const nanoid = require('nanoid');

const { User } = require('../../models/user');

const { RequestError, sendEmail } = require('../../helpers');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({ email, name, password: hashPassword, avatarURL, verificationToken });
    const mail = {
        to: email,
        subject: "Verification email ",
        html:"<a href=''></a>"
    }
    res.status(201).json({
        name: result.name, 
        email: result.email
    })
}

module.exports = register;