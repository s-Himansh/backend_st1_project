const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { connectToDB, getDB } = require('./db');
const allControllers = require('./controller/allControllers');

app.use(express.json())

let db
connectToDB((error) => {
    if (!error){
        app.listen(3000, () => {
            console.log('app listening at 3000')
        })
        db = getDB()
    }
})

mongoose.connect('mongodb+srv://sneilhhh:OjlUAb95kZzRTy8z@cluster0.foa5oyg.mongodb.net/Blog?retryWrites=true&w=majority');

app.get('/', (req, res) => {
    res.send('<h1>Welcome to blog api</h1>');
});

app.use('/blogs', allControllers);


