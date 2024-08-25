import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { empMiddleware } from "../middleware/employeeMiddleware";
import Company from "../models/company";

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

export default router;