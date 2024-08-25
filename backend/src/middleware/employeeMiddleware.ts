import { NextFunction,Response,Request } from "express";
import User from "../models/user";

export const empMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userId = req.userId;
        // Checking if User Has ROle or not'
        const findUser = await User.findById(userId);
        if(!findUser){
            return res.status(404).json({
                message:"Cannot find User with this ID"
            })
        };
        if(findUser.role==="Employee"){
            next();
        }else{
            return res.status(401).json({
                message:"Unauthorized Access"
            })
        }
    } catch (error:any) {
        return res.status(400).json({
            error:error.message
        })
    }
}