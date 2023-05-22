const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
const Employee = require('../model/employee');
const auth = require('../middleware/auth');


router.get('/' ,async (req , res)=> {
    const employees = await Employee.find().sort('name');
    res.send(employees);
});

router.get('/:id' , async(req , res)=> {
    const findEmp = await Employee.findById(req.params.id);
    if(!findEmp){
        res.status(404).send('This employee is not found');
    };
    res.send(findEmp);
});

router.post('/', auth , async (req,res) =>{
    const employee = new Employee({
        name: req.body.name,
        salary: req.body.salary
    });

    await employee.save();
    res.send(employee);
});

router.put('/:id',  async (req,res)=>{
    const employee = await Employee.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, {new:true});

    if (!employee) {
        res.status(404).send('Employee not found')
    };
    res.send(employee);
});

router.delete('/:id' , async (req,res)=>{
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) {
        res.status(404).send('Employee not found')
    };

    res.send(employee);
});

module.exports = router;