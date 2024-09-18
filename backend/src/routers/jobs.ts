import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import Jobs from "../models/Jobs";
import { empMiddleware } from "../middleware/employeeMiddleware";
import mongoose from "mongoose";
import { editJobSchema } from "../types/jobTypes";
import User from "../models/user";
import Company from "../models/company";


const router = Router();

// Get all jobs with filters
router.get("/multiJob",authMiddleware,async(req,res)=>{
    try {
        const { location, role, sort,locationType,salary} = req.query;
        let filter:any = {};
        if(location){
            filter.companyLocation = { $regex: location, $options: "i" }
        }
        if(role){
            filter.role = {$regex: role, $options: "i"}
        }
        if(locationType){
            filter.location = locationType
        }
        if(salary){
            filter.salary = {$gt:salary}
        }
        const sortValue = sort==="asc"?1:-1;
        const jobs = await Jobs.find(filter).sort({ createdAt: sortValue });
        res.status(200).json({jobs});
    } catch (error:any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

// Get one job ByID
router.get("/job/:id",authMiddleware,async(req,res)=>{
    try {
        const {id} = req.params;
        const job = await Jobs.findById(id);
        if(!job){
            throw new Error("No Job found with this ID")
        }
        res.status(200).json({job})
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
})

router.get("/searchJob",authMiddleware,async(req,res)=>{
    const { role, location }:any = req.query;

    try {
        // Create regex patterns for case-insensitive matching
        const roleRegex = role ? new RegExp(role, 'i') : null; // 'i' for case-insensitive
        const locationRegex = location ? new RegExp(location, 'i') : null;

        // First query: Find jobs that match both role and location using regex
        let jobs = await Jobs.find({
            ...(roleRegex && { role: roleRegex }),
            ...(locationRegex && { location: locationRegex })
        });

        // If no jobs found, perform the second query
        if (jobs.length === 0) {
            jobs = await Jobs.find({
                $or: [
                    ...(roleRegex ? [{ role: roleRegex }] : []),
                    ...(locationRegex ? [{ location: locationRegex }] : [])
                ]
            });
        }

        // Return the results
        return res.status(200).json({jobs});
    }catch(err){
        res.status(400).json({
            error:err
        })
    }
})

router.get("/getApplicants/:jobId",authMiddleware,empMiddleware,async(req,res)=>{
    // const userId = req.userId;
    const {jobId} = req.params
    try {
        const job = await Jobs.findById(jobId)
        .populate('submissions','-password') // Select specific fields to populate
        .exec();
            if (!job) {
                return res.status(404).json({
                    message: "No Applicants as of Now"
                });
            }
        res.json({applicants:job.submissions})
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
})

// Edit job
router.patch("/editJob/:jobId",authMiddleware,empMiddleware,async(req,res)=>{
    const userId = req.userId;
    const {jobId} = req.params;
    try {
        const body = req.body;
        const parseData = editJobSchema.safeParse(body);
        if(!parseData.success){
            const errors = parseData.error.errors.map(err => {
                return {
                    path: err.path.join('.'),
                    message: err.message,
                };
            });
        
            return res.status(400).json({
                message: "Validation errors occurred",
                errors: errors,
            });
        }
       const updated =  await Jobs.findByIdAndUpdate(jobId,{
            title:parseData.data?.title,
            salary:parseData.data?.salary,
            description:parseData.data?.description,
            role:parseData.data.role
        },{new:true});
        return res.status(200).json({
            message:"Updated Success",
            updated
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message,
        })
    }
})

// Delete job by ID
router.delete("/job/:id",authMiddleware,empMiddleware,async(req,res)=>{
    const userId = req.userId;
    const {id} = req.params;
    try {
        const findUser = await User.findById(userId);
        const company = await Company.findOne({
            employee:findUser?._id
        });
        if(!findUser || !company){
            throw new Error("Cannot find User or Company")
        };
        // Session to main ACID:
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const deleteJob = await Jobs.findByIdAndDelete(id);
            await Company.findByIdAndUpdate(company._id,
                {
                    $pull:{
                        'jobs':deleteJob?._id
                    }
                },
                {new:true}
            )
            await User.findByIdAndUpdate(userId,{
                $pull:{
                    'jobs':deleteJob?._id
                },
            },{new:true});
            session.commitTransaction();
        } catch (error:any) {
            await session.abortTransaction();
            res.status(400).json({
                error:error.message
            })
        }finally{
            session.endSession();
        }
        res.status(200).json({
            success:true,
            message:"Job Deleted"
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
})



export default router;

//66c81....1f