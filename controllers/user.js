const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) =>{
    const {fullname, email, password} = req.body

    const user = await User({
        fullname, 
        email,
        password
    })
await user.save()
res.json(user)
}

exports.userSignIn = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user) return res.json(
        {success: false, message: 'user not found with the given email!'})

    const isMatch = await user.comparePassword(password)
    if(!isMatch) return res.json(
        {success: false, message: 'Email or password does not match.'})
    
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

        res.json({success: true, user, token })
    }
