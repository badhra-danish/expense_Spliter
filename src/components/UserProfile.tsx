import { Button } from "./ui/button";
import React from "react";
import UpdateProfile from "./UpdateProfile";
import type { UpdateProfileRef } from "./UpdateProfile";
import { Dialog ,DialogContent,DialogClose,DialogDescription,DialogTrigger, DialogHeader, DialogFooter, DialogTitle } from "./ui/dialog";
interface Contact {
  name: string;
  number: string;
}

interface UserDetail {
  avatarUrl: string;
  email: string;
  displayName: string;
  mobileNumber: string;
  contact_list: Contact[];
}

function UserProfile() {
  const [open, setOpen] = React.useState(false);
  const profileRef = React.useRef<UpdateProfileRef>(null);

  const handleDialogUpdate = () => {
    profileRef.current?.handleUpdate();
  };
  const [userDetail, setUserDetail] = React.useState<UserDetail | null>();

  React.useEffect(() => {
    const Users = localStorage.getItem("Users");
    if (Users) {
      const data = JSON.parse(Users);
      if(typeof data.contact_list === 'string'){
        data.contact_list = JSON.parse(data.contact_list)
      }
      setUserDetail(data);
    }
  }, []);
  return (
    <>
    
      <div className="w-full">
        <div className="flex items-center justify-between pt-6 px-11">
          <h1 className="text-3xl font-medium">User Profile</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
             <Button variant="default">Update-Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
              <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
              </DialogHeader>
             
            <UpdateProfile ref={profileRef} onClose={() => setOpen(false)} />
              <DialogFooter>
                <DialogClose asChild>
                <Button type="button">Close</Button>
                </DialogClose>
                <Button type="button" onClick={handleDialogUpdate}>Save Change</Button> 
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
        </div>

        <div className=" flex items-center justify-center">
          {userDetail && (
            <>
              <div className="w-full p-6 rounded-2xl">
                <div className="flex items-center justify-star px-3">
                  <img
                    className="w-20 h-20 object-fit rounded-full"
                    src={userDetail.avatarUrl}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 justify-start items-center">
                  <div className="p-3 rounded-2xl mt-4 flex flex-col w-90 gap-1.5">
                    <p className="font-bold">Email:</p>
                    <p className="text-gray-500">{userDetail.email}</p>
                  </div>
                  <div className="p-3 rounded-2xl mt-4 flex flex-col w-90 gap-1.5">
                    <p className="font-bold">DisplayName:</p>
                    <p className="text-gray-500">{userDetail.displayName}</p>
                  </div>
                  <div className="p-3 rounded-2xl mt-4 flex flex-col w-90 gap-1.5">
                    <p className="font-bold">Mobile Number:</p>
                    <p className="text-gray-500">{userDetail.mobileNumber}</p>
                  </div>
                </div>
                <div>
                  <div className="p-3">
                    <p className="font-bold">Conatct List</p>
                    <div className="flex flex-wrap">
                      {userDetail &&
                        userDetail?.contact_list.map((contact , i) => (
                          <div className="p-2 " key={i}>
                            <div className="bg-gray-100 w-50 p-2 rounded-sm">
                              <p>{contact.name}</p> <p>{contact.number}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
