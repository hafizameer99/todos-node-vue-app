const express = require('express');
const app = express();
const todoRoute = require('./api/routes/todos');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://restapi:restapi@restapi.dl5y11d.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('connection failed');
});

mongoose.connection.on('conncected',connected=>{
    console.log('connected with database....');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:8080'
  }));

app.use('/api/',todoRoute);

app.use((req,res,next) => {
    res.status(400).json({
        error: 'bad request'
    })
})

module.exports = app;