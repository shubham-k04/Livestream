const fastify = require("fastify");
const mongoose = require("mongoose");

const app = fastify();

mongoose.connect('mongodb://127.0.0.1:27017/livestream_db').then(() => {
    console.info("Database connected successfully")
}).catch((err) => {
    console.error(`There was an error connceting to database. Err: ${err}`)
    process.exit(1);
});

app.get('/', (req, res) => {
    res.code(200);
    return {
        message: "Server is up and running"
    }
});

app.register(require('./auth/route'), {
    prefix: '/auth'
});

module.exports = app;