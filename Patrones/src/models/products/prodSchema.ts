import Joi from "joi"


export const prodJoiSchema = Joi.object({
    nombre: Joi.string().required(),
    precio: Joi.number().required(),
    stock: Joi.number().required()
})