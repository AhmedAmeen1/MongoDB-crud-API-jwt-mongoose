const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router()



const Employee = mongoose.model('Employee' , new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    salary: {
        type: Number,
        required: true,
    }
}))

module.exports = Employee;