import mongoose from 'mongoose'

const classSchema = mongoose.Schema({
    topic: String,
    organizerName: String,
    organizerId:String,
    classLink: String,
    availableSeats:Number,
    startTime:Date,
    endTime:Date,
    attendees : {
        type:[String],
        default:[]
    }
});

const classModel= mongoose.model('classModel',classSchema);

export default classModel;