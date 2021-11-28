import mongoose from 'mongoose';
import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validateEmail from '../authUtilities.js';

const secret = 'secret'
const signIn= async (req,res) => {
    try {
        let {email,password} = req.body;
        email=email.trim();email=email.toLowerCase();
        const existingUser = await userModel.findOne({email:email});
        if(!existingUser)
            res.status(200).json( "User doesn't exist");
        else{
            bcrypt.compare(password, existingUser.password)
            .then((r) => {
                if(!r){
                res.status(200).json( "Wrong Password");
                }
                else{
                    const token = jwt.sign({ email: existingUser.email, id : existingUser._id }, secret);    
                    res.status(200).json({result: existingUser,token});    
                }
            })
            .catch(() => {console.log("Exception thrown")});
        }
    } catch (error) {
        res.status(404).json(error);
    }
    
}

const signUp= async (req,res) => {
    try {
        let {name,email,password,confirmPassword,profilePic} = req.body;
        email=email.trim();email=email.toLowerCase();
        if(!validateEmail(email)){
            res.status(200).json("Invalid Email");
        }
        else{
        const existingUser = await userModel.findOne({email:email});
        if(existingUser)
            res.status(200).json( "User Already exists");
        else if(confirmPassword!==password)
            res.status(200).json("Passwords do not match");
        else{
            const hashedPassword= await bcrypt.hash(password,12);
            const newUser = new userModel({name :  name, email : email, password : hashedPassword, profilePic:profilePic});  
            await newUser.save();
            const token = jwt.sign({ email: email, id: newUser._id }, secret);    
            res.status(200).json({result: newUser, token}); 
        }
    }
    } catch (error) {
        res.status(404).json(error);
    }
    
}

export {signIn,signUp};