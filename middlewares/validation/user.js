const {check, validationResult} = require('express-validator')


exports.validateUserSignUp = [
    check('fullname').trim().not().isEmpty()
    .isLength({min: 3, max: 20}).
    withMessage('Name must be within 3 to 20 characters!')
    .isString()
    .withMessage('Must be a valid name!'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email'),
    check('password').trim().not()
    .isEmpty().withMessage('Password is empty!')
    .isLength({min: 8, max: 20}).
    withMessage('Name must be within 8 to 20 characters!'),
    check('confirmPassword').trim().not().isEmpty().custom((value, {req}) =>
        {
            if(value !== req.body.password){
                throw new Error('Both passwords must match!')
            }
            return true
        })
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if(!result.length) return next()

    const error = result[0].msg
    res.json({success: false, message: error})
}

exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage('Email is required.'),
    check('password').trim().not().isEmpty().withMessage('Password is required.')

]