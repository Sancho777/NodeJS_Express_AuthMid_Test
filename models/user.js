const mongoose = require('mongoose')

const user = {
    fullname: '',
    email: '',
    password: '',
    avatar: ''
}

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: Buffer,
})

userSchema.statics.isThisEmailInUse = async function(email){
    if(!email) throw new Error('Invalid Email')
    try {
    const user = await this.findOne({email})
    if (user) return false
    return true
} catch (error) {
    console.log('error inside EmailInUse', error.message)
    return false
    
}
}

module.exports = mongoose.model('User', userSchema)