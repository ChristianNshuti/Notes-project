const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

router.post('/register', async (req,res) => {
    const {name,email,password} = req.body;
    try{
        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save()
        res.status(201).json({message:"User created"})
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
})

router.post('/login', async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) {
            return res.status(400).json({message:"Password incorrect"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1d'
        });
        return res.status(200).json({message:"Login successfull",user:{
            name:user.name,
            email:user.email
        },token});
        
    }catch(error){
        res.status(500).json({message:error});
    }
})

    router.put('/update',auth, async (req,res)=>{
        const {name,email,password} = req.body;
        try{
            const user = await User.findById(req.user.id);

            if(name) user.name = name;
            if(email) user.email = email;
            if(password) {
                const hashedPassword = await bcrypt.hash(password,10);
                user.password = hashedPassword;
            }
            await user.save();
            res.status(200).json({message:"Profile user updated successfully",user:{name:user.name,email:user.email}});
        }catch(error){
            res.status(500).json({message:"Update failed", error});
        }
});

module.exports = router;