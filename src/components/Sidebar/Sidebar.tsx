import * as React from "react"
// Icon
import { LayoutDashboardIcon,Wallet,Users ,CircleSlash  } from "lucide-react";
import { Activity } from "lucide-react";
import { UserRoundPen } from 'lucide-react';
import {
  Collapsible,
} from "@/components/ui/collapsible"


import { useNavigate } from "react-router-dom";
export default function Sidebar() {

  const [isOpen, setIsOpen] = React.useState(false)
  const [openDashboard ,setOpenDashboard] =React.useState(true)
  const [openCreategroup ,setCreateGroup] = React.useState(false)
  const [openprofile , setopenProfile] = React.useState(false)
  const navigate = useNavigate()

  const handleClickDashbord = () => {
    setOpenDashboard(true)
    setCreateGroup(false)
    setopenProfile(false)
    navigate('/dashboard/dashpage')
  }
  const handleClickAddGroups = () => {
    setCreateGroup(true)
    setOpenDashboard(false)
    setopenProfile(false)
    navigate('/dashboard/addgroups')
  }
   const handleClickProfile = () => {
    setopenProfile(true)
    setCreateGroup(false)
    setOpenDashboard(false)
    navigate('/dashboard/profile')
  }
  return (
    <>
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}  
      className="flex w-[250px] h-screen flex-col gap-2 pt-2 border-r-2 border-gray-400 p-2"
    >
      <div className={openDashboard ? "font-bold flex gap-3  px-4 py-2 cursor-pointer ml-4 bg-gray-200 rounded-lg" :"flex gap-3  px-4 py-2 cursor-pointer" } onClick={handleClickDashbord}>
        <LayoutDashboardIcon/>
       Dashboard
      </div>
      <div className="flex gap-3 px-4 py-2 cursor-pointer">
        <Activity/>
      Recent Activity
      </div>
      <div className="flex gap-3 px-4 py-2 cursor-pointer">
        <Wallet/>
      All Expense
      </div>
      <div className={openCreategroup ? "font-bold flex gap-3 px-4 py-2 cursor-pointer ml-4 bg-gray-200 rounded-lg" :"flex gap-3 px-4 py-2 cursor-pointer" } onClick={handleClickAddGroups}>
        <Users />
       Create Group
      </div>
      <div className={openprofile ? "font-bold flex gap-3 px-4 py-2 cursor-pointer ml-4 bg-gray-200 rounded-lg" :"flex gap-3 px-4 py-2 cursor-pointer" } onClick={handleClickProfile}>
        <UserRoundPen/>
        My Profile
      </div>
      <div className="flex gap-3 px-4 py-2 cursor-pointer">
        <CircleSlash/>
       Others
      </div>
    </Collapsible>
    </>
  )
}
