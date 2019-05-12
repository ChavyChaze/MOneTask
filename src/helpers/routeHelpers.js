'use strict'

const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).send(result.error);
            }

            if (!req.value) {
                req.value = {};
            }
            req.value['body'] = result.value;
            next();
        }
    },
    schemas: {
        projectSchema: Joi.object().keys({
            title: Joi.string().max(20).regex(/^[A-Za-z .,'()-]{0,121}$/).required(),
            description: Joi.string().max(200).regex(/^[A-Za-z .,'()-]{0,121}$/),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        }),
        taskSchema: Joi.object().keys({
            projectId: Joi.string().required(),
            title: Joi.string().max(20).regex(/^[A-Za-z .,'()-]{0,121}$/).required(),
            description: Joi.string().max(200).regex(/^[A-Za-z .,'()-]{0,121}$/),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        })
    }
}