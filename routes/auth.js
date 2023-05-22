const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
const User = require('../model/user');
const _ = require('lodash');
const jwt = require('jsonwebtoken');


router.post('/' , async (req,res) =>{
    let user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(404).send("invalid email ")
    };
     
    if (req.body.password != user.password) {
        return res.status(404).send("invalid password")
    };
    const token = user.generateTokens();
    res.send(`The token is ${token}`);
});

module.exports = router;