import * as React from "react";
// Icon
import { LayoutDashboardIcon, Wallet, Users, CircleSlash } from "lucide-react";
import { Activity } from "lucide-react";
import { UserRoundPen } from "lucide-react";
import { LogOut } from "lucide-react";
import { Collapsible } from "@/components/ui/collapsible";

import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openDashboard, setOpenDashboard] = React.useState(true);
  const [openCreategroup, setCreateGroup] = React.useState(false);
  const [openprofile, setopenProfile] = React.useState(false);
  const navigate = useNavigate();

  const handleClickDashbord = () => {
    setOpenDashboard(true);
    setCreateGroup(false);
    setopenProfile(false);
    navigate("/dashboard/dashpage");
  };
  const handleClickAddGroups = () => {
    setCreateGroup(true);
    setOpenDashboard(false);
    setopenProfile(false);
    navigate("/dashboard/addgroups");
  };
  const handleClickProfile = () => {
    setopenProfile(true);
    setCreateGroup(false);
    setOpenDashboard(false);
    navigate("/dashboard/profile");
  };
  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-[280px] h-screen flex-col pt-2 border-r-2 border-[rgb(239,245,255)] dark:bg-black"
      >
        <div
          className={
            openDashboard
              ? "font-bold flex gap-3  cursor-pointer px-6 py-4 bg-[rgb(239,245,255)]  border-l-5 border-[rgb(43,127,255)]"
              : "flex gap-3 px-4 py-4 cursor-pointer"
          }
          onClick={handleClickDashbord}
        >
          <LayoutDashboardIcon />
          Dashboard
        </div>
        <div className="flex gap-3 px-4 py-4 cursor-pointer">
          <Activity />
          Recent Activity
        </div>
        <div className="flex gap-3 px-4 py-4 cursor-pointer">
          <Wallet />
          All Expense
        </div>
        <div
          className={
            openCreategroup
              ? "font-bold flex gap-3 px-6 py-4 cursor-pointer  bg-[rgb(239,245,255)] border-l-5 border-[rgb(43,127,255)]"
              : "flex gap-3 px-4 py-4 cursor-pointer"
          }
          onClick={handleClickAddGroups}
        >
          <Users />
          Create Group
        </div>
        <div
          className={
            openprofile
              ? "font-bold flex gap-3 px-6 py-4 cursor-pointer bg-[rgb(239,245,255)] border-l-5 border-[rgb(43,127,255)]"
              : "flex gap-3 px-4 py-4 cursor-pointer"
          }
          onClick={handleClickProfile}
        >
          <UserRoundPen />
          My Profile
        </div>
        <div className="flex gap-3 px-4 py-4 cursor-pointer">
          <CircleSlash />
          Others
        </div>
        <div className="h-full">
          <div className="relative h-full">
            <div className="flex gap-3 px-4 py-4 cursor-pointer absolute bottom-20 left-1.5 hover:text-red-600">
              <LogOut />
              LogOut
            </div>
          </div>
        </div>
      </Collapsible>
    </>
  );
}
