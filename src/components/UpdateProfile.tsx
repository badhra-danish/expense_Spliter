import React from "react";
import DummyUserImg from "../assets/dummyusers.png";
import { Button } from "./ui/button";
import { UpdateUserData } from "@/api/apiClient";
interface Contact {
  name: string;
  number: string;
}

interface UserDetail {
  avatarUrl: string;
  avatar: File | string;
  email: string;
  displayName: string;
  mobileNumber: string;
  contact_list: Contact[];
}
// interface UpdateProfileProps {
//   onClose: () => void;
// }
export interface UpdateProfileRef {
  handleUpdate: () => void;
}

import axios from "axios";
import { UserPen } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { forwardRef, useImperativeHandle } from "react";
import toast from "react-hot-toast";

const UpdateProfile = forwardRef<UpdateProfileRef, { onClose: () => void }>(
  ({ onClose }, ref) => {
    const [userDetail, setUserDetail] = React.useState<UserDetail | null>();
    const [preview, setPreview] = React.useState("");
    const [Loading, setLoading] = React.useState<Boolean>(false);

    const getUserById = async () => {
      try {
        setLoading(true);
        const id = localStorage.getItem("id");
        if (!id) return;
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
        const data = res.data.data[0];
        if (data) {
          setUserDetail(data);
          setPreview(data.avatarUrl || DummyUserImg);
        }
      } catch (error) {
        console.error("Error Fetching user Data", error);
      } finally {
        setLoading(false);
      }
    };
    // console.log("abc", userDetail);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!userDetail) return;
      setUserDetail({
        ...userDetail,
        [e.target.name]: e.target.value,
      });
    };

    React.useEffect(() => {
      getUserById();
    }, []);

    const handleConatactChange = (
      index: number,
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (!userDetail) return;
      const updateConatact = [...userDetail?.contact_list];
      updateConatact[index] = {
        ...updateConatact[index],
        [e.target.name]: e.target.value,
      };
      setUserDetail({ ...userDetail, contact_list: updateConatact });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !userDetail) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setUserDetail((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          avatar: file,
          avatarUrl: URL.createObjectURL(file),
        };
      });
    };

    const handleUpdate = () => {
      if (!userDetail) return;
      // const updated: UserDetail = {
      //   ...userDetail,
      //   contact_list: [...userDetail.contact_list],
      // }

      const formData = new FormData();
      formData.append("avatar", userDetail.avatar as File);
      formData.append("email", userDetail.email);
      formData.append("displayName", userDetail.displayName);
      formData.append("mobileNumber", userDetail.mobileNumber);
      formData.append("contact_list", JSON.stringify(userDetail.contact_list));

      const id = localStorage.getItem("id");
      if (!id) return;
      setLoading(true);
      try {
        UpdateUserData(formData, id).then((res) => {
          if (res?.status === 200) {
            toast.success("Profile Updated");
          } else {
            toast.error("Failed to update");
          }
        });
      } catch (error) {
        console.error("Error Update User Data ", error);
      } finally {
        setLoading(false);
      }
      // UpdateUserData(formData, id)
      //   .then((res) => {
      //     console.log("User Data Update Successfully" ,res);
      //   })
      //   .catch(error => {
      //     console.error("Error Update User Data " ,error);
      //   })
    };

    useImperativeHandle(ref, () => ({
      handleUpdate,
    }));

    const addContactField = () => {
      if (!userDetail) return;
      setUserDetail({
        ...userDetail,
        contact_list: [...userDetail.contact_list, { name: "", number: "" }],
      });
    };

    const removeContact = () => {
      if (!userDetail) return;
      if (userDetail.contact_list.length > 1) {
        setUserDetail({
          ...userDetail,
          contact_list: [...userDetail.contact_list].slice(0, -1),
        });

        // Remove corresponding errors
      }
    };

    return (
      <>
        <div>
          <div className="w-full flex items-center justify-center">
            {Loading ? (
              <>
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </>
            ) : (
              <>
                <form>
                  <div className="w-full h-24 flex items-center justify-center">
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label htmlFor="avatar" className="cursor-pointer">
                      <div className="relative ">
                        <img
                          src={preview || userDetail?.avatarUrl} // use a default placeholder if no image
                          alt="Profile Preview"
                          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                        />
                        <UserPen className="absolute bottom-0 right-0 text-gray-700 bg-white border-1 rounded-full p-1  " />
                      </div>
                    </Label>
                  </div>
                  <div>
                    <Label htmlFor="email" className="block mb-3 font-medium ">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={userDetail?.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phoneNumber"
                      className="block mb-3 font-medium mt-5"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={userDetail?.mobileNumber}
                      placeholder="Enter your phone number"
                      name="phoneNumber"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="displayName"
                      className="block mb-3 font-medium mt-5"
                    >
                      Display Name *
                    </Label>
                    <Input
                      id="displayName"
                      type="text"
                      value={userDetail?.displayName}
                      placeholder="Enter your display name"
                      name="displayName"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label className="block mb-3 font-medium mt-5">
                      Emergency Contacts *
                    </Label>
                    {userDetail?.contact_list?.map((contact, i) => (
                      <div key={i} className="space-y-2 mb-3">
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Input
                              type="text"
                              placeholder="Contact name"
                              name="name"
                              value={contact.name}
                              onChange={(e) => handleConatactChange(i, e)}
                            />
                          </div>
                          <div className="flex-1">
                            <Input
                              type="tel"
                              placeholder="Contact number"
                              value={contact.number}
                              name="number"
                              onChange={(e) => handleConatactChange(i, e)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={addContactField}
                        className="text-sm"
                      >
                        + Add Contact
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={removeContact}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        - Remove
                      </Button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default UpdateProfile;
