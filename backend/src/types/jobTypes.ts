import {z} from "zod";

export const editJobSchema = z.object({
    salary:z.string(),
    description:z.string(),
    title:z.string(),
    role:z.string(),
})