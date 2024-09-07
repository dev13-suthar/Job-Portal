import { BACKEND_URL } from "@/constants";
import { atom, selector } from "recoil";
import { sortAtom } from "./sortAtom";

export const AllJobsSelector = selector({
  key: "allJobsSelector",
  get: async ({get}) => {
    const sortValue = get(sortAtom)
    await new Promise(resolve=>setTimeout(resolve,2000))
    // http://localhost:7002/api/v1/jobs/multiJob?location=india
    const res = await fetch(`${BACKEND_URL}/api/v1/jobs/multiJob?sort=${sortValue}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    return data.jobs;   
  },
});

export const AllJobsAtom = atom({
  key: "allJobs",
  default: AllJobsSelector, // Use the selector directly as the default
});
