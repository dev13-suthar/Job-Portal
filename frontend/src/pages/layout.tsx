import Appbar from '@/components/Appbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <Appbar/>
        <Outlet/>
    </div>
  )
}

export default Layout