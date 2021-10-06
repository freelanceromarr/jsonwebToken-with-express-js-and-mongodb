const express= require('express');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const checkauth= require('../middleware/auth')
const todoSchema = require('../schema/todoSchema');
const userSchema = require('../schema/userSchema');
const Todo = new mongoose.model('Todo',todoSchema);
const User = new mongoose.model('User',userSchema);


todoRoutes.get('/', checkauth, async (req, res) => {
    try {
        const result= await Todo.find({}).populate("user", "-password")
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
            user: req.userid
        });
        const resutl = await todo.save();
        const user= await User.updateOne(
            {_id: req.userid,
            $push:{
                todo:todo._id
            }
            }
        )
        res.status(200).json({message:'todo insterted successfully'})
    } catch (error) {
        res.status(500).json({error:'something wrong'})
    }
})


module.exports = todoRoutes;