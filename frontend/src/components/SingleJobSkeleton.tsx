import { Skeleton } from './ui/skeleton'

const SingleJobSkeleton = () => {
  return (
    <div className='w-[650px] h-[500px] rounded-lg px-4 mt-10'>
        <div className='flex items-center gap-2'>
            <Skeleton className='p-3 size-10 rounded-full'/>
            <Skeleton className='w-[250px] rounded-md'>
                <p className='w-4 h-2'></p>
            </Skeleton>
        </div>
        <div className='p-2'>
            <Skeleton className='w-full h-[200px] rounded-2xl'/>
        </div>
    </div>
  )
}

export default SingleJobSkeleton