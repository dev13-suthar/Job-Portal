import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routers/user"
import employeeRouter from "./routers/employee"
import jobsRouter from "./routers/jobs"
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.end("Healthy Server")
})

// Routes
app.use('/api/v1',userRouter);
app.use("/api/v1/employee",employeeRouter);
app.use("/api/v1/jobs",jobsRouter)

    
const PORT = process.env.PORT || 6008
mongoose.connect(process.env.MONGO_URL!!)
.then(()=>{
    app.listen(PORT,()=>console.log(`Server Port:${PORT}`))
})
.catch((err)=>console.log(err))
