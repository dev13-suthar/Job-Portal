import { Router } from "express";
import { profileSchema, signinSchema, signupSchema } from "../types/userType";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user";
import { authMiddleware } from "../middleware/authMiddleware";
import { empMiddleware } from "../middleware/employeeMiddleware";
import { createCompanySchema, createJobSchema } from "../types/companyType";
import Company from "../models/company";
import Jobs from "../models/Jobs";
import mongoose from "mongoose";



const router = Router();

// Sign up 
router.post("/signup",async(req,res)=>{
    try {
        const body = req.body;
        const parsedData = signupSchema.safeParse(body);
        if(!parsedData.success){
        throw new Error("Incorrect Inputs")
    }
        const hashedPassword = await bcrypt.hash(parsedData.data.password,10);
        const newUser = new User({
            name:parsedData.data.name,
            email:parsedData.data.email,
            password:hashedPassword,
            phone:parsedData.data.phone,
            role:parsedData.data.role,
        });
        await newUser.save();
        res.status(201).json({
            newUser
        });

    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
})

// Signin
router.post("/signin",async(req,res)=>{
    try {
        const body = req.body;
    const parsedData = signinSchema.safeParse(body);
    if(!parsedData.success){
        throw new Error("Incorrect Inputs")
    };
    const findUser = await User.findOne({
        email:parsedData.data.email
    });
    if(!findUser){
        return res.status(404).json({msg:"Cannot find User"});
    };
    const match = await bcrypt.compare(parsedData.data.password,findUser.password);
    if(!match) return res.status(400).json({msg:"Invalid Password"});

    // Jwt Auth
    const token = jwt.sign({userId:findUser._id, role:findUser.role},process.env.JWT_SECRET!!);
    res.status(200).json({hasCreatedCompany:findUser.hasCreatedCompany,token,isProfileCompleted:findUser.isProfileCompleted,role:findUser.role})
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
})


// Profile SUmmaray
router.post("/profileSummary",authMiddleware,async(req,res)=>{
    try {
        const userId = req.userId;
        const body = req.body;
        const parsedData = profileSchema.safeParse(body);
        if (!parsedData.success) {
            return res.status(400).json({ error: parsedData.error.errors });
        }
        const updateInfo = await User.findByIdAndUpdate(
            userId,
            {'profile.profileSummary':parsedData.data.profilesummary,
                $push: {
                    'profile.pastExperience': parsedData.data.pastExperience 
                },
            isProfileCompleted:true,
            profession:parsedData.data.profession,
            githubUserName:parsedData.data.githubUserName,
            },
            {new:true}
        );
        if (!updateInfo) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updateInfo);
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
})

// Creating Company and JOBS
router.post("/createCompany",authMiddleware,empMiddleware,async(req,res)=>{
    try {
    const userId = req.userId;
    // Select or Create Company;
    const body = req.body;
    const parsedData = createCompanySchema.safeParse(body);
    if(!parsedData.success){
      throw new Error("Incorrect Types")
    };
   const newCompany = new Company({
        name:parsedData.data.name,
        description:parsedData.data.description,
        profilePic:parsedData.data.profilePic || 'https://cdn.pixabay.com/photo/2024/02/17/00/18/cat-8578562_1280.jpg',
        employee:userId
   });
   await newCompany.save();
   await User.findByIdAndUpdate(userId,{
    hasCreatedCompany:true
   },{new:true})
   res.status(201).json({newCompany})
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
})

// Create JObs;
router.post("/newJob",authMiddleware,empMiddleware,async(req,res)=>{
    try {
        const userId = req.userId;
        const body = req.body;
        const parsedData = createJobSchema.safeParse(body);
        if(!parsedData.success){
            throw new Error("inCorrect Inputs")
        };
        const searchCompany = await Company.findOne({
            name:parsedData.data?.companyName
        });
        if(!searchCompany){
            res.status(404).json({
                message:"Cannot find Your COmpany, Create One"
            })
        };
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const newJob = new Jobs({
                title:parsedData.data?.title,
                description:parsedData.data?.description,
                role:parsedData.data?.role,
                location:parsedData.data?.location,
                company:searchCompany?.name,
                createdBy:userId,
                salary:parsedData.data?.salary,
                companyLocation:parsedData.data.companyLocation,
                logo:searchCompany?.profilePic ?? "'https://cdn.pixabay.com/photo/2024/02/17/00/18/cat-8578562_1280.jpg'"
            });
            await newJob.save();
            await Company.findByIdAndUpdate(searchCompany?.id,
                {
                    $push:{
                        'jobs':newJob
                    }
                },
                {new:true}
            )
            await User.findByIdAndUpdate(userId,
                {
                   $push:{
                        'jobs':newJob
                   } 
                },
                {new:true}
            );
            session.commitTransaction()
        } catch (error:any) {
            await session.abortTransaction();
            res.status(400).json({
                error:error.message
            })
        }finally{
            session.endSession();
        }
        res.status(201).json({
            success:true,
            message:"Job Created"
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
})

// Apply to JOb
router.post("/apply",authMiddleware,async(req,res)=>{
    try{
        const userId = req.userId;
        const jobId = req.query.jobId;
        const jobs = await Jobs.findById(jobId);
        const checkDupEntry = jobs?.submissions?.find(x=>x.toString()===userId);
        if(checkDupEntry){
            throw new Error("Already Applied")
        }
        const ApplytoJob = await Jobs.findByIdAndUpdate(jobId,{
            $push:{
                'submissions':userId
            }
        },{new:true});
        const addjobTOUserDb = await User.findByIdAndUpdate(userId,{
            $push:{
                'applications':jobId
            }
        },{new:true});
        res.status(201).json({
            message:"Applied to Jobs DOne",
            ApplytoJob,
            addjobTOUserDb
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
})

// Get the user job he applied to
router.get("/myapplications",authMiddleware,async(req,res)=>{
    const userId = req.userId;
    const user = await User.findById(userId).populate('applications').exec();

    if (!user) {
        console.log('User not found');
        return res.status(404).json({
            message:"Cannot find USER"
        })
      }
  
      // Step 2: Get the list of jobs the user has applied to
      const jobs = user.applications;
  
      // Step 3: Return or log the job information
      res.json({jobs})
    // const userJosnn=  await Jobs.aggregate([
    //     { $match: {submissions:userId} }
    // ]);
    // res.status(200).json({userJosnn})
})

// Gets user all information
router.get("/me",authMiddleware,async(req,res)=>{
    const userId = req.userId;
    const user = await User.findById(userId).select("-password,-jobs");
    res.json({user});
})

// byd ID
router.get("/user/:id",authMiddleware,async(req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id).select("-password,-jobs");
    res.json({user});
})
export default router;