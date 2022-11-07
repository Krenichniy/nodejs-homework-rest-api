const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegex,
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: ""
    }, 
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default:false
    },
    verificationToken: {
        type: String,
        required: true,
    }
})

userSchema.post("save", handleSaveErrors); 

const registerShema = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required(),
    subscription:Joi.string(),
});

const loginShema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required(),
    subscription:Joi.string(),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().required(),
})

const schemas = {
    registerShema,
    loginShema,
    updateSubscriptionSchema,
}
const User = model("user", userSchema);

module.exports = {
    User,
    schemas
};