import Joi from 'joi';

// phone, email. website

const contactInfoValidationSchema =
    Joi.alternatives().try(
        Joi.object({
            infoType: Joi.string().valid('email'),
            value: Joi.string().email()
        }),
        Joi.object({
            infoType: Joi.string().valid('website'),
            value: Joi.string().uri()
        }),
        Joi.object({
            infoType: Joi.string().valid('phone'),
            value: Joi.string().pattern(/^[\D-]*$/)
        }),
        Joi.object({
            infoType: Joi.string().pattern(/^[a-zA-Z0-9_]*$/).min(5),
            value: Joi.string()
        })
    );

const contactValidationSchema =
    Joi.object({
        firstName: Joi.string()
            .alphanum()
            .min(2),
        lastName: Joi.string()
            .alphanum()
            .min(2)
            .required(),
        contactInfos: Joi.array().items(contactInfoValidationSchema)
    });

export { contactValidationSchema, contactInfoValidationSchema };