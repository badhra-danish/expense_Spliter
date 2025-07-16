import { Bell, Search } from "lucide-react";
import { UserRoundPen } from "lucide-react";
import { LogOut } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/Darkmode";
import { useNavigate } from "react-router-dom";
import { GetUserbyId } from "@/api/apiClient";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
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

function Header() {
  const { setIsLoggedIn } = useLogin();
  const { theme, toggleTheme } = useTheme();
  const [avatar, setAvatar] = React.useState<string>("");
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("Token");
    Cookies.remove("UserId");
    setIsLoggedIn(false);
    if (!Cookies.get("Token")) {
      navigate("/login");
    }
  };

  const getAvatarUrl = async () => {
    try {
      const res = await GetUserbyId();
      if (res?.data.data) {
        const data = res.data?.data[0].avatarUrl;
        setAvatar(data);
      } else {
        toast.error("Failed To load");
      }
      // const res = await axios.get(
      //   "https://paratapay-backend.onrender.com/api/user",
      //   {
      //     params: {
      //       search: id,
      //     },
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("Token")}`,
      //     },
      //   }
      // );
      // setAvatar(res.data?.data[0].avatarUrl);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  React.useEffect(() => {
    getAvatarUrl();
  }, []);
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
            <div onClick={toggleTheme}>
              {theme === "light" ? <Moon /> : <Sun />}
            </div>

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
