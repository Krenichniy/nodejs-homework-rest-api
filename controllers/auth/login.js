const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(401, 'Email or password wrong');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw RequestError(401, 'Email or password wrong');
    }
    const token = '12345tgd.34fdsd.4323';
    res.json({
       token
    })
}

module.exports = login;