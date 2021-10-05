const express= require('express');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const checkauth= require('../middleware/auth')
const todoSchema = require('../schema/todoSchema');
const Todo = new mongoose.model('Todo',todoSchema);


todoRoutes.get('/', checkauth, async (req, res) => {
    try {
        const result= await Todo.find({}).populate("userid", "-password")
        res.status(200).json({message:result})
    } catch (error) {
        res.status(500).json({message:"server error"})
        
    }

})

// Todo post routes
todoRoutes.post('/',checkauth, async (req, res) => {
    try {
        console.log(req.userid);
        const todo = new Todo({
            ...req.body,
            userid: req.userid
        });
        const resutl = await todo.save();
        res.status(200).json({message:'todo insterted successfully'})
    } catch (error) {
        res.status(500).json({error:'something wrong'})
    }
})


module.exports = todoRoutes;