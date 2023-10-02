import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className='flex h-screen'>
        <div className='w-1/5 h-full p-2 bg-slate-100'>Sidebar</div>
        <div className='w-4/5 p-2'>
            <Outlet />
        </div>
    </div>
  )
}
