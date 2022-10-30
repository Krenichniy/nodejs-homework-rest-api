const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const updateSubscription = async (req, res) => { 
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body); 
    if(!result){
            throw RequestError(404, "Not found")
        }
    res.json(result);
}

module.exports = updateSubscription;