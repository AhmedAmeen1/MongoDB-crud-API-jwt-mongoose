const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
const User = require('../model/user');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')


router.get('/' ,async (req , res)=> {
    const users = await User.find().select(['name' , 'email'])
    res.send(users);
});

router.get('/profile', auth ,async (req , res)=> {
    const profile = await User.findById(req.user._id);
    res.send(profile);
});


router.get('/:id' , async(req , res)=> {
    const finduser = await User.findById(req.params.id);
    if(!finduser){
        res.status(404).send('This employee is not found');
    };
    res.send(finduser);
});

router.post('/' , async (req,res) =>{
    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(404).send("This user is already registered")
    };
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });


    await user.save();
    const token = user.generateTokens();
    res.header('x-auth-token' , token).send(user);
});

router.put('/:id',  async (req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, {new:true});

    if (!user) {
        res.status(404).send('Employee not found')
    };
    res.send(user);
});

router.delete('/:id' , async (req,res)=>{
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
        res.status(404).send('Employee not found')
    };

    res.send(user);
});

module.exports = router;