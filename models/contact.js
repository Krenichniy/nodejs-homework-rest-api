const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const contactSchema = new Schema({
      name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
})

contactSchema.post("save", handleSaveErrors); 

const addShema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': `"title" should be a type of 'string'`,
        'any.required': `"title" is a required field`
    }),
    email: Joi.string().email().required().messages({
        'string.base': `"title" should be a type of 'string'`
    }),
    phone: Joi.string().required().messages({
        'string.base': `"title" should be a type of 'string'`
    }),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addShema,
    updateFavoriteSchema,
}
const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas
};