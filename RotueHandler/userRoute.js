const express = require('express');
const mongoose = require('mongoose');
const userrouter= express.Router();
const userSchema = require('../schema/userSchema');
const User = new mongoose.model('User', userSchema);
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const checkauth= require('../middleware/auth')
//signup route

userrouter.post('/signup', async (req, res) => {
    try {
        const hashedPassword= await bcrypt.hash(req.body.password, 10);
        const user=  new User(
            {
                name: req.body.name,
                username: req.body.username,
                password: hashedPassword
            }
        );
         await user.save();
        res.status(200).json({success:'signed up successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({err:error})
    }
    console.log(req.body);
})

userrouter.post('/login', async (req, res) => {
    try {
        const user= await User.find({username: req.body.username})
        if (user && user.length > 0) {
            const password = await bcrypt.compare(req.body.password, user[0].password)
            if (password) {
                const token = jwt.sign(
                    {id:user[0]._id, name: user[0].name},
                    process.env.TSECRET,
                    {expiresIn: "20h"}
                )
                res.status(400).json({
                    token: token,
                    message: "login successfully"
                })
            }
            else{
                res.status(401).json({err: 'Athentication failed'})
            }
        }
        else{
            res.status(401).json({err:'Authentication error'})
        }
    } catch (error) {
        res.status(500).json({error})
    }

})

//authenticated route
userrouter.get('/', checkauth ,async function(req, res) {
    try {
        const user= await User.find({}).populate("todo")
        res.status(200).json({user:user})
    } catch (error) {
        res.status(500).json({error:error})
        
    }

})
// rest route 
// userrouter.get('/', (req, res) => {
//     res.send('I am working')
// });

userrouter.get('/alluser', async (req, res) => {
    try {
    const resutl= await User.find({}).populate('todo');
    res.status(200).json({result: resutl})
    } catch (error) {
    res.status(500).json({result: "something error happened"})
    }
})

module.exports = userrouter;