import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import Jobs from "../models/Jobs";


const router = Router();

// Get all jobs
router.get("/all",authMiddleware,async(req,res)=>{
    try {
        const jobs = await Jobs.find({});
        res.json({jobs})
    } catch (error:any) {
        res.status(404).json({
            error:error.message
        })
    }
})
export default router;

router.get("/filteredJob",authMiddleware,async(req,res)=>{
    console.log(req.query.role, req.query.joblocation)
    try {
        const query:any = {};

    if (req.query.role) {
    query.role = { $regex: req.query.role, $options: 'i' };
    }

    if (req.query.joblocation) {
    query.companyLocation = { $regex: req.query.joblocation, $options: 'i' };
    }

const jobs = await Jobs.find(query);
        res.json({jobs})
    } catch (error:any) {
        res.status(404).json({
            error:error.message
        })
    }
})