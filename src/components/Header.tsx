
import { Bell } from 'lucide-react'
import { UserRoundPen } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from 'react';

function Header() {
  const [avatar , setAvatar] = React.useState('')
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("Users");
    navigate("/login");
  
 
  };
  React.useEffect(() => {
    const UserData = localStorage.getItem('Users')
    if(UserData){
      const Data = JSON.parse(UserData)
      setAvatar(Data.avatarUrl)  
    }
  },[])
  
  return (
    <>
       <nav className="w-full px-4 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className= "text-xl font-bold">
          MyWebsite
        </div>

        {/* Right side: Notification + User */}
        <div className="flex items-center space-x-10">
          {/* Notification Icon */}
          <div className="relative">
            <Bell/>
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>

          {/* User Avatar */}
          <div className=' w-9 h-9 rounded-3xl overflow-hidden'>
          {/* <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'/> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            {/* <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'/> */}
            <Avatar>
              <AvatarImage src={avatar}/>
              <AvatarFallback>ZN</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserRoundPen/>   
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut/>
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
  )
}

export default Header
