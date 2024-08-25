import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    profileSummary: {
        type: String,
        required: false
    },
    profilePic: {
        type: String,
        required: false
    },
    pastExperience: {
        type: [],  // Define the type of elements in the array
        required: false,
        default: []
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profession:{
        type:String,
        required:false
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Employee'],
        default: 'User'
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: profileSchema,
        required: false
    },
    applications: {
        type: [String],  // Define the type of elements in the array
        required: false,
        default: []
    },
    jobs: {
        type: [{type:mongoose.Schema.Types.ObjectId,ref:'Job'}], // Adjust the type depending on what you store (e.g., job IDs or job titles)
        required: false,
        default: []
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:"Company"
    },
    hasCreatedCompany:{
        type:Boolean,
        default:false
    },
    isProfileCompleted:{
        type:Boolean,
        default:false
    }
});

userSchema.pre('save', function(next) {
    if (this.role !== 'Employee') {
        this.jobs = []; // Clear jobs if the role is not 'Employee'
    }
    if(this.role !== 'Employee'){
        this.company = null
    }
    next();
});

const User = mongoose.model('User', userSchema);
export default User;
