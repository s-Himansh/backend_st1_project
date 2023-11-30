const { MongoClient } = require('mongodb')

let connection

let url = 'mongodb+srv://sneilhhh:OjlUAb95kZzRTy8z@cluster0.foa5oyg.mongodb.net/Blog?retryWrites=true&w=majority';

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect(url)
        .then((client) => {
            connection = client.db()
            return cb()
        })
        .catch((error) => {
            console.log(error)
            return cb(error)
        })
    },
    getDB: () => connection
}

