const Env = require('../globals/env_variables')
const Mongoose = require("mongoose")

exports.connect = () => {

    const url = Env.MONGODB_LINK

    Mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB')
        Mongoose.set('debug', true);
    }).catch((error) => { console.log('Connection Error', error) })
}