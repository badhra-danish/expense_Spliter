import * as React from "react"
// Icon
import { LayoutDashboardIcon,Wallet,UserRoundPlus,CircleSlash  } from "lucide-react";
import { Activity } from "lucide-react";
import {
  Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleClickDashbord = () => {
    navigate('/dashboard/dashpage')
  }
  const handleClickAddGroups = () => {
    navigate('/dashboard/addgroups')
  }
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}  
      className="flex w-[300px] flex-col gap-2"
    >
      <div className="flex gap-3 border-b px-4 py-2 " onClick={handleClickDashbord}>
        <LayoutDashboardIcon/>
       Dashboard
      </div>
      <div className="flex gap-3 border-b px-4 py-2 ">
        <Activity/>
      Recent Activity
      </div>
      <div className="flex gap-3 border-b px-4 py-2 ">
        <Wallet/>
      All Expense
      </div>
      <div className="flex gap-3 border-b px-4 py-2 " onClick={handleClickAddGroups}>
        <UserRoundPlus/>
       Create Group
      </div>
      <div className="flex gap-3 border-b px-4 py-2 ">
        <CircleSlash/>
       Others
      </div>
    </Collapsible>
  )
}
