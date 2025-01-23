import Joi from 'joi';

const contactValidationSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(2),
    lastName: Joi.string()
        .alphanum()
        .min(2)
        .required(),
    contactInfos: Joi.array().items(
        Joi.object({
            infoType: Joi.string().pattern(/^[a-zA-Z]*$/).min(5),
            value: Joi.string()
        }))
});

export { contactValidationSchema };