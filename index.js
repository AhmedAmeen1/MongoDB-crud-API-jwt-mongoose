const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');
const employees = require('./routes/employees');
const auth = require('./routes/auth');
const users = require('./routes/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
app.use(express.json());

mongoose.set('strictQuery', true)

 mongoose.connect('mongodb://127.0.0.1:27017/mycompany', {
    useNewUrlParser: true,
    useUnifiedTopology: true
 })
.then((console.log('connected to database...')))
.catch((e) => console.error(`failed ${e}`));

app.use('/api/users', users);
app.use('/api/employees', employees);
app.use('/api/auth', auth);

app.use('/', (req,res) =>{
    res.send('Welcome to the home page!')
});


const port = 3000;




app.listen(port , ()=>{console.log(`server is live on port ${port}`)});