import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:"User"
    },
    companyLocation:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    location:{
        type:String,
        enum:["Remote","On-site","Hybrid"],
        required:false
    },
    submissions:{
        type:[],
        required:false,
        default:[]
    }
});

const Jobs = mongoose.model('Job',jobSchema);
export default Jobs;

