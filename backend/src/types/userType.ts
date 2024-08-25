import z from "zod";

export const signupSchema = z.object({
    name:z.string(),
    password:z.string().min(6),
    email:z.string(),
    phone:z.string(),
    role:z.string(),
})

export const signinSchema = z.object({
    email:z.string().email(),
    password:z.string(),
})

export const profileSchema = z.object({
    profilesummary:z.string().optional(),
    pastExperience:z.object({
        startDate:z.string(),
        endDate:z.string(),
        role:z.string(),
        companyName:z.string()
    }).optional(),
    profession:z.string().optional(),
})