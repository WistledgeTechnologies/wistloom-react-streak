import DashboardHeader from "@//components/dashboard/DashboardHeader"
import Sidebar from "@//components/dashboard/Sidebar"
import { Outlet } from "react-router-dom"


const DashboardLayout = () => {

  return (
    <>
        <div className="w-full h-screen flex bg-red-500">
            <Sidebar />
            <div className="flex-1">
                <DashboardHeader/>
                <main className="flex items-center justify-center">
                    <Outlet />
                </main>
            </div>
        </div>
    </>
  )
}

export default DashboardLayout