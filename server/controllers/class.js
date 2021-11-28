import mongoose from 'mongoose';
import classModel from '../models/classModel.js';
import userModel from '../models/userModel.js';

const scheduleClass = async (req,res) => {
    const classDetails= req.body;
    const newClass= new classModel({topic: classDetails.topic, 
        organizerName: classDetails.organizerName, 
        organizerId: classDetails.organizerId,
        classLink: classDetails.classLink,
        availableSeats: classDetails.availableSeats,
        startTime: classDetails.startTime,
        endTime: classDetails.endTime,
        attendees: [req.userId],
        waitingList: []
    });
    try {
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(409).json(error);
    }
}

const registerForClass = async (req,res) => {
    const {id}= req.params;
    const class_=await classModel.findById(id);
    const index = class_.attendees.findIndex((id) => id ===String(req.userId));
    if (index === -1) {
        class_.attendees.push(req.userId);
        class_.availableSeats=class_.availableSeats-1;
    }
    try {
        const updatedClass=await classModel.findByIdAndUpdate(id,class_,{new:true});
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(404).json(error);
    }
}


const getTimeline = async (req,res) => {
    try {
        const classes = await classModel.find();
        const loggedInUser= await userModel.findById(req.userId);
        const myUpcomingClasses = classes.filter((class_)=> (loggedInUser.following.includes(class_.organizerId)));
        const myNewUpcomingClasses = myUpcomingClasses.filter((class_)=>(!(class_.attendees.includes(req.userId)) && (new Date(class_.endTime)>new Date())));
        myNewUpcomingClasses.reverse();
        res.status(200).json(myNewUpcomingClasses);
    } catch (error) {
        res.status(404).json(error);
    }
}

const myClasses = async (req,res) => {
    try {
        const classes= await classModel.find();
        const myClasses= classes.filter((class_)=>(class_.attendees.includes(req.userId)));
        res.status(200).json(myClasses);
    } catch (error) {
        res.status(404).json(error);
    }
}




export {scheduleClass, registerForClass, getTimeline,myClasses};