import mongoose from 'mongoose';
import userModel from '../models/userModel.js';

const searchUser= async (req,res) => {
    try {
        const {searchQuery}= req.params;
        const users = await userModel.find();
        const query = users.filter((user)=> (user.name.includes(searchQuery) && user._id!=req.userId));
        res.status(200).json(query);
    } catch (error) {
        res.status(404).json(error);
    }
    
}

const follow= async (req,res) => {
    const {id}= req.params;    
    try {
        const user = await userModel.findById(req.userId);
        const index = user.following.findIndex((tid) => tid ===String(id));
        if (index === -1) {
            user.following.push(id);
        }
        else{
            user.following = user.following.filter((tid) => tid !== String(id));
        }
        const updatedUser=await userModel.findByIdAndUpdate(req.userId,user,{new:true});   
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json(error);
    }
}

export {searchUser,follow};
