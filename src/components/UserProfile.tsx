// import { Button } from "./ui/button";
// import React from "react";
// import UpdateProfile from "./UpdateProfile";
// import Loader from "./Loader";
// import type { UpdateProfileRef } from "./UpdateProfile";
// import {
//   Dialog,
//   DialogContent,
//   DialogClose,
//   DialogDescription,
//   DialogTrigger,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
// } from "./ui/dialog";
// import axios from "axios";

// interface Contact {
//   name: string;
//   number: string;
// }

// interface UserDetail {
//   avatarUrl: string;
//   email: string;
//   displayName: string;
//   mobileNumber: string;
//   contact_list: Contact[];
// }

// function UserProfile() {
//   const [open, setOpen] = React.useState(false);
//   const [Loading, setLoading] = React.useState(false);
//   const profileRef = React.useRef<UpdateProfileRef>(null);

//   const handleDialogUpdate = () => {
//     profileRef.current?.handleUpdate();
//   };
//   const [userDetail, setUserDetail] = React.useState<UserDetail | null>();

//   const getUserById = async () => {
//     try {
//       setLoading(true);
//       const id = localStorage.getItem("id");
//       if (!id) return; // exit early if no id

//       const res = await axios.get(
//         "https://paratapay-backend.onrender.com/api/user",
//         {
//           params: {
//             search: id,
//           },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("Token")}`,
//           },
//         }
//       );
//       const data = res.data?.data[0];
//       if (data) {
//         setUserDetail(data);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // console.log("userDetail",userDetail);
//   React.useEffect(() => {
//     getUserById();
//   }, []);

//   return (
//     <>
//       <div className="w-full">
//         <div className="flex items-center justify-between pt-6 px-11">
//           <h1 className="text-3xl font-medium">User Profile</h1>
//           <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//               <Button variant="default">Edit-Profile</Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Update Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you&apos;re
//                   done.
//                 </DialogDescription>
//               </DialogHeader>

//               <UpdateProfile ref={profileRef} onClose={() => setOpen(false)} />
//               <DialogFooter>
//                 <DialogClose asChild>
//                   <Button type="button">Close</Button>
//                 </DialogClose>
//                 <Button type="button" onClick={handleDialogUpdate}>
//                   Save Change
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>

//         <div className=" flex items-center justify-center">
//           {Loading ? (
//             <div className="flex items-center justify-center h-screen">
//               {" "}
//               <Loader />
//             </div>
//           ) : (
//             <>
//               <div className="w-full p-6 rounded-2xl">
//                 <div className="flex items-center justify-star px-3">
//                   <img
//                     className="w-20 h-20 object-fit rounded-full"
//                     src={userDetail?.avatarUrl}
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 justify-start items-center">
//                   <div className="p-3 rounded-2xl mt-4 flex flex-col w-90 gap-1.5">
//                     <p className="font-bold">Email:</p>
//                     <p className="text-gray-500">{userDetail?.email}</p>
//                   </div>
//                   <div className="p-3 rounded-2xl mt-4 flex flex-col w-90 gap-1.5">
//                     <p className="font-bold">DisplayName:</p>
//                     <p className="text-gray-500">{userDetail?.displayName}</p>
//                   </div>
//                   <div className="p-3 rounded-2xl mt-4 flex flex-col w-90 gap-1.5">
//                     <p className="font-bold">Mobile Number:</p>
//                     <p className="text-gray-500">{userDetail?.mobileNumber}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="p-3">
//                     <p className="font-bold">Conatct List</p>
//                     <div className="flex flex-wrap">
//                       {userDetail &&
//                         userDetail?.contact_list?.map((contact, i) => (
//                           <div className="p-2 " key={i}>
//                             <div className="bg-white w-50 p-2 rounded-sm">
//                               <p>{contact.name}</p> <p>{contact.number}</p>
//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserProfile;
import { Button } from "./ui/button";
import React from "react";
import UpdateProfile from "./UpdateProfile";
import Loader from "./Loader";
import type { UpdateProfileRef } from "./UpdateProfile";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { DeleteUser, GetUserbyId } from "@/api/apiClient";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/context/Login";
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
  const navigate = useNavigate();
  const { isLoggedIn } = useLogin();
  const [open, setOpen] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
  const [saveLoading, setSaveLoading] = React.useState(false);
  const profileRef = React.useRef<UpdateProfileRef>(null);

  const handleDialogUpdate = async () => {
    try {
      setSaveLoading(true);
      profileRef.current?.handleUpdate();
      // Close dialog after successful update
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const [userDetail, setUserDetail] = React.useState<UserDetail | null>();

  const getUserById = async () => {
    try {
      setLoading(true);

      const res = await GetUserbyId();
      if (res?.data.data) {
        const data = res.data?.data[0];
        setUserDetail(data);
      } else {
        toast.error("Failed To load");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      const res = await DeleteUser();
      if (res?.status === 200) {
        toast.success("Account Delete Successfully");
        Cookies.remove("Token");
        Cookies.remove("UserId");
        navigate("/signup");
        setUserDetail(null);
      } else {
        toast.error("Failed To Delete Account");
      }
    } catch (error) {
      toast.error("Failed To Delete Account");
    } finally {
      setLoading(false);
    }
  };

  // console.log("userDetail",userDetail);
  React.useEffect(() => {
    getUserById();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between pt-6 px-11">
          <h1 className="text-3xl font-medium">User Profile</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Edit-Profile</Button>
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
                  <Button type="button" disabled={saveLoading}>
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  onClick={handleDialogUpdate}
                  disabled={saveLoading}
                >
                  {saveLoading ? (
                    <>
                      <Loader />
                      <span className="ml-2">Saving...</span>
                    </>
                  ) : (
                    "Save Change"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className=" flex items-center justify-center">
          {Loading ? (
            <div className="flex items-center justify-center h-screen">
              {" "}
              <Loader />
            </div>
          ) : (
            <>
              <div className="w-full p-6 rounded-2xl">
                <div className="flex items-center justify-star px-3">
                  <img
                    className="w-20 h-20 object-fit rounded-full"
                    src={userDetail?.avatarUrl}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 justify-start items-center">
                  <div className="p-3 rounded-2xl mt-4 flex flex-col w-90 gap-1.5">
                    <p className="font-bold">Email:</p>
                    <p className="text-gray-500">{userDetail?.email}</p>
                  </div>
                  <div className="p-3 rounded-2xl mt-4 flex flex-col w-90 gap-1.5">
                    <p className="font-bold">DisplayName:</p>
                    <p className="text-gray-500">{userDetail?.displayName}</p>
                  </div>
                  <div className="p-3 rounded-2xl mt-4 flex flex-col w-90 gap-1.5">
                    <p className="font-bold">Mobile Number:</p>
                    <p className="text-gray-500">{userDetail?.mobileNumber}</p>
                  </div>
                </div>
                <div>
                  <div className="p-3">
                    <p className="font-bold">Conatct List</p>
                    <div className="flex flex-wrap">
                      {userDetail &&
                        userDetail?.contact_list?.map((contact, i) => (
                          <div className="p-2 " key={i}>
                            <div className="bg-white w-50 p-2 rounded-sm">
                              <p>{contact.name}</p> <p>{contact.number}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="mt-7">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button className="bg-red-500 hover:bg-red-500">
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure Delete This Account?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="hover:bg-red-500 bg-red-500"
                          onClick={handleDeleteUser}
                        >
                          {Loading ? "Deleteing..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
