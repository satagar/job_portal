const mongoose = require('mongoose')

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongo_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('db connected: ${conn.connection.host}')
    } catch (error) {
        console.log('Error: ${error.message}')
        process.exit()
    }
}

module.exports = connectdb;