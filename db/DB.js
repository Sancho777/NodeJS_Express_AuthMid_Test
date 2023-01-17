const mongoose = require('mongoose');
const UserModel = require('./models/user');
const TokenModel = require('./models/DataToken');
const IPModel = require('./models/DataIP');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('DB connected.')
}).catch(err => console.log(err.message))

class DB {
    static async getLimit(id, isToken) {
        if (isToken) return await TokenModel.findOne({ userId: id })
        else return await IPModel.findOne({ IP: id })
    }

    static async insertLimit({ id, timestamp }, isToken) {
        if (isToken) return await TokenModel.create({ userId: id, timestamp })
        else return await IPModel.create({ IP: id, timestamp })
    }

    static async updateLimit({ id, limit }, isToken) {
        if (isToken) return await TokenModel.findOneAndUpdate({ userId: id }, { limit })
        else return await IPModel.findOneAndUpdate({ IP: id }, { limit })
    }

    static async updateDate({ id, timestamp }, isToken) {
        if (isToken) return await TokenModel.findOneAndUpdate({ userId: id }, timestamp)
        else return await IPModel.findByIdAndUpdate({ IP: id }, timestamp)
    }

    static async getUserByEmail(email) {
        return await UserModel.findOne({ email })
    }

    static async getUserById(_id) {
        return await UserModel.findOne({ _id })
    }
}

module.exports = DB