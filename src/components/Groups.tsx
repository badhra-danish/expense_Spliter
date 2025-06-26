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

interface groupMember {
  name: string;
  number: string;
}

interface Groupdata {
  avatarUrl: File  | null;
  groupName: string;
  groupDescription: string;
  groupMember: groupMember[];
}

function Groups() {
  const [groupData, setGroupData] = React.useState<Groupdata>({
    avatarUrl: null,
    groupName: "",
    groupDescription: "",
    groupMember: [{ name: "", number: "" }],
  });

  const [group, setGroup] = React.useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGroupData({
      ...groupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleimageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGroupData((prev) => ({
        ...prev,
        avatarUrl: file,
      }));
    }
  };

  // const handleimageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file); // ✅ convert File to URL
  
  //     setGroupData((prev) => ({
  //       ...prev,
  //       avatarUrl: imageUrl, // ✅ store the preview URL
  //     }));
  //   }
  // };
  

  const handleGroppMemeber = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newMember = [...groupData.groupMember];
    newMember[index] = {
      ...newMember[index],
      [e.target.name]: e.target.value,
    };
    setGroupData({
      ...groupData,
      groupMember: newMember,
    });
  };
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const existingGroups = JSON.parse(
  //     localStorage.getItem("groupData") || "[]"
  //   );

  //   if (existingGroups) {
  //     const updatedGroups = [...existingGroups, groupData];
  //     localStorage.setItem("groupData", JSON.stringify(updatedGroups));
  //   }

  //   setGroupData({
  //     avatarUrl: null,
  //     groupName: "",
  //     groupDescription: "",
  //     groupMember: [{ name: "", number: "" }],
  //   });
  // };

  // React.useEffect(() => {
  //   const fetchGroup = () => {
  //     const savedGroup = localStorage.getItem("groupData");
  //     if (savedGroup) {
  //       const parsed = JSON.parse(savedGroup);
  //       setGroup(parsed);
  //     }
  //   };

  //   fetchGroup();
  // }, []); // <-- empty dependency array = run once

  // React.useEffect(() => {
  //   console.log(group);
  // }, [group]);

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
                <form className="w-full">
                  <DialogHeader>
                    <DialogTitle>Create a Group</DialogTitle>
                  </DialogHeader>
                  <div>
                    <div className="my-4">
                      <Label className="mb-3">Upload Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={handleimageUpload}
                      />
                    </div>
                    <div className="my-4">
                      <Label className="mb-3">Enter the Group Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter Group Name"
                        value={groupData.groupName}
                        name="groupName"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="my-4">
                      <Label className="mb-3">Enter Description</Label>
                      <Textarea
                        placeholder="Type Your Descriptions.."
                        name="groupDescription"
                        value={groupData.groupDescription}
                        className="w-full h-[100px] overflow-y-auto resize-none whitespace-pre-wrap break-words custom-scroll rounded-md"
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div className="my-4">
                      <Label className="mb-3">Group Members</Label>
                      <Command>
                        <CommandInput placeholder="Search the Members" />
                        <CommandList>
                          <CommandEmpty>No Member Found</CommandEmpty>
                          <CommandGroup>
                             <CommandItem>
                                    <span>Clander</span>
                                </CommandItem>
                                <CommandItem>
                                    <span>Smile</span>
                                </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </div> */}
                    <Label>Add Memebrs</Label>
                    {groupData.groupMember?.map((member, i) => (
                      <div className="flex gap-3 mt-2" key={i}>
                        <Input
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={member.name}
                          onChange={(e) => handleGroppMemeber(i, e)}
                        />
                        <Input
                          type="number"
                          placeholder="Number"
                          value={member.number}
                          name="number"
                          onChange={(e) => handleGroppMemeber(i, e)}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Create Group</Button>
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
              <AvatarImage src=""/>
             </Avatar>
             <p>Badhra</p>
         </div> 
        </div>
      </div>
    </>
  );
}

export default Groups;
