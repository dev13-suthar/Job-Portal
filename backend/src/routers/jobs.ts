import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import Jobs from "../models/Jobs";
import { empMiddleware } from "../middleware/employeeMiddleware";
import { Schema } from "mongoose";


const router = Router();

// Get all jobs
router.get("/all",authMiddleware,async(req,res)=>{
    try {
        const jobs = await Jobs.find({}).sort({ createdAt: -1 });
        res.json({jobs})
    } catch (error:any) {
        res.status(404).json({
            error:error.message
        })
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

router.get("/jobfilters",authMiddleware,async(req,res)=>{
    try {
        const locationType = req.query.locationtype;
        const jobs = await Jobs.find({
            location:locationType  
        });
        if(!jobs){
            throw new Error("No Matching Results")
        }
        res.json({jobs})
    } catch (error:any) {
        res.status(400).json({
            error:error.message
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

export default router;