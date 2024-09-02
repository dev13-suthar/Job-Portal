import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        required:false
    },
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    jobs: {
        type: [{type:mongoose.Schema.Types.ObjectId,ref:'Job'}], // Adjust the type depending on what you store (e.g., job IDs or job titles)
        required: false,
        default: []
    }
},{timestamps:true});

const Company = mongoose.model('Company',CompanySchema);
export default Company