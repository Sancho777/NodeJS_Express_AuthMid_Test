const mongoose = require('mongoose')

const DataIPSchema = new mongoose.Schema({
    IP: { type: String, require: true },
    limit: { type: Number, default: 0 },
    timestamp: { type: Number, default: 0 },
})

module.exports = mongoose.model('LimitIP', DataIPSchema)