const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser = new User({ username, email, password:hashedPassword});
        await newUser.save();

        res.status(201).json({ message: 'User successfully created', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await User.findOne({email});
        if(!user){
            res.status(400).send({msg:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(500).send({msg:"somethin went wrong"});  
        }
        res.status(200).send({msg:"successfully login"})
    }catch(err){
        res.status(500).send({msg:"invalid email or password"});
    }
})


module.exports = router;
