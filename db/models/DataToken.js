const mongoose = require('mongoose')

const DataTokenSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    limit: { type: Number, default: 0 },
    timestamp: { type: Number, default: 0 },
})

module.exports = mongoose.model('LimitToken', DataTokenSchema)