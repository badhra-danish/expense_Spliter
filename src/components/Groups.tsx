import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import DummyUserImg from "../assets/dummyusers.png";
import { UserPen } from "lucide-react";
import { CreateGroup } from "@/api/apiClient";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
// interface groupMember {
//   name: string;
//   number: string;
// }

interface Groupdata {
  avatarUrl: File | null;
  groupName: string;
  groupType: string;
  groupDescription: string;
}

function Groups() {
  const [isLoading, setIsLoading] = React.useState<Boolean>(false);
  const [groupData, setGroupData] = React.useState<Groupdata>({
    avatarUrl: null,
    groupName: "",
    groupType: "",
    groupDescription: "",
  });
  const [previewimg, setPreviewImg] = React.useState<string | null>();
  const [group, setGroup] = React.useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!groupData) return;
    setGroupData({
      ...groupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGroupTypeChange = (value: string) => {
    setGroupData((prev) => ({
      ...prev,
      groupType: value,
    }));
  };
  const handleimageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!groupData || !file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result as string);
    };
    reader.readAsDataURL(file);
    console.log(previewimg);

    if (file) {
      setGroupData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          avatarUrl: file,
        };
      });
    }
  };
  console.log(groupData);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = localStorage.getItem("id");
    if (!id) return;
    const formData = new FormData();
    if (!groupData) return;
    formData.append("groupAvatar", groupData.avatarUrl as File);
    formData.append("name", groupData.groupName);
    formData.append("groupType", groupData.groupType);
    formData.append("description", groupData.groupDescription);
    formData.append("createdBy", id);

    try {
      setIsLoading(true);
      const toastId = toast.loading("Creating Group...");
      //toastId;
      const response = await CreateGroup(formData);
      if (response?.status === 201) {
        toast.success("Group Created Successfully");
        setGroupData({
          avatarUrl: null,
          groupName: "",
          groupType: "",
          groupDescription: "",
        });
        toast.dismiss(toastId);
        setPreviewImg(null);
      } else {
        toast.dismiss(toastId);
        toast.error("Failed To Create Group");
      }
    } catch (error) {
      toast.error("Failed to Create Group");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full px-5 py-5">
        <div className="flex items-center justify-between">
          <p>Create A Groups As the Trip, Couple Freinds ,Others</p>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create Groups</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSubmit} className="w-full">
                  <DialogHeader>
                    <DialogTitle>Create a Group</DialogTitle>
                  </DialogHeader>
                  <div>
                    <div className="w-full h-24 flex items-center justify-center">
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleimageUpload}
                        className="hidden"
                      />
                      <Label htmlFor="avatar" className="cursor-pointer">
                        <div className="relative ">
                          <img
                            src={previewimg || DummyUserImg} // use a default placeholder if no image
                            alt="Profile Preview"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                          />
                          <UserPen className="absolute bottom-0 right-0 text-gray-700 bg-white border-1 rounded-full p-1  " />
                        </div>
                      </Label>
                    </div>
                    <div className="my-4">
                      <Label className="mb-3">Enter the Group Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter Group Name"
                        value={groupData?.groupName}
                        name="groupName"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="my-4">
                      <Label className="mb-3">Group Type</Label>
                      <Select
                        onValueChange={handleGroupTypeChange}
                        value={groupData.groupType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="EQUAL_SPLIT">
                              EQUAL_SPLITE
                            </SelectItem>
                            <SelectItem value="CUSTOM_SPLIT">
                              CUSTOM_SPLITE
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="my-4">
                      <Label className="mb-3">Enter Description</Label>
                      <Textarea
                        placeholder="Type Your Descriptions.."
                        name="groupDescription"
                        value={groupData?.groupDescription}
                        className="w-full h-[100px] overflow-y-auto resize-none whitespace-pre-wrap break-words custom-scroll rounded-md"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">
                        {isLoading ? "Creating..." : "Create Group"}
                      </Button>
                    </DialogFooter>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Group display . . .  */}
        <div className="mt-5">
          <div className="w-full bg-amber-100 p-5 rounded-2xl">
            <Avatar>
              <AvatarImage src="" />
            </Avatar>
            <p>Badhra</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Groups;
