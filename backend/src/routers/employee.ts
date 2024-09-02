import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { empMiddleware } from "../middleware/employeeMiddleware";
import Company from "../models/company";
import Jobs from "../models/Jobs";

const router = Router();

router.get("/getMyCompany",authMiddleware,empMiddleware,async(req,res)=>{
    const userId = req.userId;
    const company = await Company.find({
        employee:userId
    });
    if(!company){
        res.status(404).json({
            error:"Cannot find your company"
        })
    };
    res.json({company});
})

router.get("/getMyJobs",authMiddleware,empMiddleware,async(req,res)=>{
    const userId = req.userId;
    try {
        const jobs = await Jobs.find({
            createdBy:userId
        });
        res.status(200).json({jobs});
    } catch (error:any) {
        res.status(400).json({
            error:"Error while getting jobs"
        })
    }
})
export default router;