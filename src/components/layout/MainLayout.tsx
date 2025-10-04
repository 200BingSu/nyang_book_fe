import { Outlet } from 'react-router-dom'
import SideBar from './menu/SideBar'

const MainLayout = () => {
  return (
    <div className='bg-stone-100 h-screen p-4 flex gap-4'>
      <SideBar/>
      <Outlet />
    </div>
  )
}

export default MainLayout