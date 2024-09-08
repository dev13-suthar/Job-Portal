import z from "zod";

export const createCompanySchema = z.object({
    name:z.string(),
    description:z.string(),
    profilePic:z.string().optional(),
})

export const createJobSchema = z.object({
    title:z.string(),
    description:z.string(),
    companyName:z.string(),
    role:z.string(),
    salary:z.string(),
    location:z.enum(["Remote" , "On-site" , "Hybrid"]),
    companyLocation:z.string(),
    logo:z.string().optional(),
})