const joi = require('joi'); 

const validForm = (req, res, next) => { 
    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
        confirm_password: joi.ref('password')
    })

    const {error} = schema.validate(req.body);
    if (error) {
        console.log(error.details);
        const result = error.details.map(details  => ({
            field: details.path[0],
            message: details.message
        }))
    }

    return res.status(400).json({
        error: true,
        message: 'Invalid form data',
        data: result
    })

    next()
}

module.exports = {validForm}