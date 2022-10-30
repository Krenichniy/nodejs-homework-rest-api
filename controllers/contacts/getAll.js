const { Contact } = require('../../models/contact');

const getAll = async (req, res) => { 
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, ...filters } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner, ...filters},'', {skip, limit}).populate("owner", "name email");
    res.json(result)
}

module.exports = getAll;