const express = require('express')
const { validationResult } = require('express-validator')

const router = express.Router()
const {createUser, userSignIn} = require('../controllers/user')
const { isAuth } = require('../middlewares/auth')
const { rateLimit } = require('../middlewares/rateLimit')
const { validateUserSignUp, userValidation } = require('../middlewares/validation/user')

router.post('/create-user', validateUserSignUp, userValidation, createUser )
router.post('/sign-in', validateUserSignUp, userValidation ,userSignIn)
router.post('/create-post', isAuth, rateLimit ,(req, res) => {
    res.send('Welcome, you are in a private route!')
})

module.exports = router