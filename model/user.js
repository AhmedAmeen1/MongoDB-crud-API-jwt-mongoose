const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
});

userSchema.methods.generateTokens = ()=>{
    const token = jwt.sign({_id:this._id} , 'privateKey')
    return token ;
};

const User = mongoose.model('User', userSchema);


module.exports = User;