import FiltersSideBar from './FiltersSideBar'
import Jobs from './Jobs'



const JobDisplay = () => {

  return (
    <div className='p-2 w-full  mt-12 flex gap-3'>
        <FiltersSideBar/>
        <Jobs/>
    </div>
  )
}

export default JobDisplay