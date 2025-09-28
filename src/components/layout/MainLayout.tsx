import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='bg-stone-100 h-screen'>
      <Outlet />
    </div>
  )
}

export default MainLayout