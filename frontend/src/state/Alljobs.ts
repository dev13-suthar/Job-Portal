import { BACKEND_URL } from "@/constants";
import { atom, selector } from "recoil";

export const AllJobsSelector = selector({
  key: "allJobsSelector",
  get: async () => {
    await new Promise(resolve=>setTimeout(resolve,2000))
    const res = await fetch(`${BACKEND_URL}/api/v1/jobs/all`, {
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
