import { Bell, Search } from "lucide-react";
import { UserRoundPen } from "lucide-react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { useLogin } from "../context/Login.tsx";
import axios from "axios";

function Header() {
  const { user, setUser } = useLogin();
  const [avatar, setAvatar] = React.useState<string>("");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("id");
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    }
    setUser(null);
  };
  console.log(user);

  // React.useEffect(() => {
  //   const UserData = localStorage.getItem('Users')
  //   if(UserData){
  //     const Data = JSON.parse(UserData)
  //     setAvatar(Data.avatarUrl)
  //   }
  // },[])

  const getAvatarUrl = async () => {
      const id = localStorage.getItem("id");
    if (!id) return; // exit early if no id
    try {
      const res = await axios.get(
        "https://paratapay-backend.onrender.com/api/user",
        {
          params: {
            search: id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      setAvatar(res.data?.data[0].avatarUrl);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  
  React.useEffect(() => {
    getAvatarUrl();
  },[])  
  // UserData.map((data) => {
  //   if(data.avatarUrl){
  //     setAvatar(data.avatarUrl);
  //   }
  // })

  
  return (
    <>
      <nav className="w-full h-20 px-5 py-4 shadow-md">
        <div className="flex items-center justify-between h-full">
          {/* Logo / Brand */}
          <div className="text-xl font-bold">Expense Spliter..</div>

          {/* Right side: Notification + User */}
          <div className="flex items-center space-x-10">
            {/* Notification Icon */}
            <div className="relative">
              <Bell />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>

            {/* User Avatar */}
            <div className=" w-9 h-9 rounded-3xl overflow-hidden">
              {/* <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'/> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'/> */}
                  <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>ZN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserRoundPen />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
