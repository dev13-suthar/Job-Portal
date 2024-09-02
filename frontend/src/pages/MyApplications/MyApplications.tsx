import useGetMyApplications from "@/hooks/useGetMyApplications"

const MyApplications = () => {
    const {isLoading,jobs} = useGetMyApplications();
    if(isLoading){
      return "loadingg.."
    }
  return (
    <div>
        <header className="pt-9 px-11">
            <p className="text-3xl font-semibold text-blue-600">My Applications:-</p>
        </header>
        <div className="mt-6 flex items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-4 w-[64%]  rounded-xl p-3">
            <section className="grid grid-cols-3 w-full bg-slate-900 p-3 rounded-2xl text-2xl text-purple-500">
                      <p className="flex items-center justify-start">CompanyName</p>
                      <p className="flex items-center justify-center">Role</p>
                      <p className="flex items-center justify-end">Status</p>
                    </section>
                {jobs?.map((job)=>(
                    <section className="grid grid-cols-3 w-full bg-slate-900 p-3 rounded-2xl" key={job._id}>
                      <p className="flex items-center justify-start">{job.company}</p>
                      <p className="flex items-center justify-center">{job.role}</p>
                      <p className="flex items-center justify-end">Status: Pending</p>
                    </section>
                ))}
            </div>
        </div>
    </div>
  )
}

export default MyApplications
