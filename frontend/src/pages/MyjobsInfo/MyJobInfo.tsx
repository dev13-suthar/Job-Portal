import { useParams } from "react-router-dom"
import { MyjobsCard } from "../feed/EmployeeFeed";
import useGetJob from "@/hooks/useGetJob";
import useGetJobApplicants from "@/hooks/useGetJobApplicants";
import UserCard from "@/components/UserCard";

const MyJobInfo = () => {
    const {id} = useParams();
    const  {loading,jobs} = useGetJob(id ?? "");
    const {applicants,loadingApplicants} = useGetJobApplicants(id ?? "");
    console.log(applicants);

    if(loading || loadingApplicants){
        return "loadingg."
    }
  return (
    <div className="pt-12 px-8 flex justify-center items-center">
        <div className="flex w-[80%] flex-col gap-4">
            <MyjobsCard id={jobs?._id ?? ''} salaray={jobs?.salary?? "not"} companyLocation={jobs?.companyLocation??"India"} role={jobs?.role??""} applications={jobs?.submissions.length.toString()??"0"} jobType={jobs?.location??""}/>

            {/* List of Applicanst */}
            <p className="text-3xl font-bold text-blue-600 mt-8">Applicants</p>
            <div className="flex items-center justify-center">
                <div className="flex flex-col w-[56%] gap-3">
                    {applicants?.map((user)=>(
                        <UserCard key={user._id} id={user._id} name={user.name} role={user.profession??"NULL"}/>
                    ))}
                </div>
            </div>
        </div>     
    </div>
  )
}

export default MyJobInfo