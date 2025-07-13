//

import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import { CircleAlert } from "lucide-react";
import DummyUserImg from "../assets/dummyusers.png";
import { UserPen } from "lucide-react";
import { CircleX } from "lucide-react";
import { CreateAccount } from "@/api/apiClient";
import { toast } from "react-hot-toast";

function SignUpPage() {
  interface ContactType {
    name: string;
    number: string;
  }

  interface FormDataType {
    avatar: File | null;
    displayName: string;
    password: string;
    email: string;
    phoneNumber: string;
    contact_list: ContactType[];
  }

  interface FormErrorsType {
    displayName?: string;
    password?: string;
    email?: string;
    avatar?: string;
    phoneNumber?: string;
    contact_list?: { name?: string; number?: string }[];
    general?: string;
  }

  const [formData, setFormData] = React.useState<FormDataType>({
    avatar: null,
    email: "",
    displayName: "",
    password: "",
    phoneNumber: "",
    contact_list: [{ name: "", number: "" }],
  });
  const [preview, setPreview] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<FormErrorsType>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validatePassword = (password: string): boolean => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrorsType = {};

    // Display Name validation
    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = "Display name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, and number";
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    // Avatar validation
    if (!formData.avatar) {
      newErrors.avatar = "Profile image is required";
    } else {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(formData.avatar.type)) {
        newErrors.avatar = "Please upload a valid image file (JPEG, PNG, GIF)";
      } else if (formData.avatar.size > 5 * 1024 * 1024) {
        // 5MB limit
        newErrors.avatar = "Image size should be less than 5MB";
      }
    }

    // Contact list validation
    const contactErrors: { name?: string; number?: string }[] = [];
    formData.contact_list.forEach((contact, index) => {
      const contactError: { name?: string; number?: string } = {};

      if (!contact.name.trim()) {
        contactError.name = "Contact name is required";
      } else if (contact.name.trim().length < 2) {
        contactError.name = "Name must be at least 2 characters";
      }

      if (!contact.number.trim()) {
        contactError.number = "Contact number is required";
      } else if (!validatePhoneNumber(contact.number)) {
        contactError.number = "Please enter a valid phone number";
      }

      if (contactError.name || contactError.number) {
        contactErrors[index] = contactError;
      }
    });

    if (contactErrors.length > 0) {
      newErrors.contact_list = contactErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrorsType]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleContactList = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newContactList = [...formData.contact_list];
    newContactList[index] = {
      ...newContactList[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      contact_list: newContactList,
    });

    // Clear contact-specific errors
    if (errors.contact_list?.[index]?.[name as keyof ContactType]) {
      const newContactErrors = [...(errors.contact_list || [])];
      if (newContactErrors[index]) {
        newContactErrors[index] = {
          ...newContactErrors[index],
          [name]: undefined,
        };
      }
      setErrors((prev) => ({
        ...prev,
        contact_list: newContactErrors,
      }));
    }
  };

  const addContactField = () => {
    setFormData({
      ...formData,
      contact_list: [...formData.contact_list, { name: "", number: "" }],
    });
  };

  const removeContact = () => {
    if (formData.contact_list.length > 1) {
      setFormData({
        ...formData,
        contact_list: [...formData.contact_list].slice(0, -1),
      });

      // Remove corresponding errors
      if (errors.contact_list && errors.contact_list.length > 1) {
        setErrors((prev) => ({
          ...prev,
          contact_list: prev.contact_list?.slice(0, -1),
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Proceed with form submission or API call
      const formdata = new FormData();
      if (formData.avatar instanceof File) {
        formdata.append("avatar", formData.avatar);
      }
      formdata.append("email", formData.email);
      formdata.append("displayName", formData.displayName);
      formdata.append("password", formData.password);
      formdata.append("mobileNumber", formData.phoneNumber);
      formdata.append("social_login_provider", "GOOGLE");
      formdata.append("contact_list", JSON.stringify(formData.contact_list));

      CreateAccount(formdata).then((res) => {
        if (res.status === 201) {
          toast.success("Account created successfully!");
        } else {
          toast.error("Failed to create acount.");
        }
      });

      console.log("Submitted:", formData);

      // Reset form on successful submission
      setFormData({
        avatar: null,
        email: "",
        displayName: "",
        password: "",
        phoneNumber: "",
        contact_list: [{ name: "", number: "" }],
      });
      setPreview("");
      setErrors({});
    } catch (error) {
      setErrors({ general: "Failed to create account. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];

  //   if (file) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       avatar: file,
  //     }));

  //     // Clear avatar error
  //     if (errors.avatar) {
  //       setErrors((prev) => ({
  //         ...prev,
  //         avatar: undefined,
  //       }));
  //     }
  //   }
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));

      if (errors.avatar) {
        setErrors((prev) => ({
          ...prev,
          avatar: undefined,
        }));
      }
    }
  };

  {
    /*Create the account of the users using api*/
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen p-4">
      <div className="w-full max-w-md p-6 border-2 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div>
            {/* <Input
              id="avatar"
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleImageUpload}
              className={`${errors.avatar ? "border-red-500" : ""}`}
            /> */}

            <div className="relative w-full h-24 flex items-center justify-center">
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="avatar" className="cursor-pointer">
                <div className="relative">
                  <img
                    src={preview || DummyUserImg} // use a default placeholder if no image
                    alt="Profile Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                  />
                  <UserPen className="absolute bottom-0 right-0 text-gray-700 bg-white border-1 rounded-full p-1  " />
                </div>
              </label>
            </div>
            {/* <Label htmlFor="avatar" className="block mb-3 font-medium">
              Upload Profile Image *
            </Label> */}
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-1 flex gap-2 items-center">
                <CircleAlert className="w-3 h-3" />
                {errors.avatar}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="block mb-3 font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              className={`${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                <CircleAlert className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="block mb-3 font-medium">
              Password *
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              className={`${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                <CircleAlert className="w-3 h-3" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phoneNumber" className="block mb-3 font-medium">
              Phone Number *
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              placeholder="Enter your phone number"
              name="phoneNumber"
              onChange={handleChange}
              className={`${errors.phoneNumber ? "border-red-500" : ""}`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 flex items-center gap-2 text-sm mt-1">
                <CircleAlert className="w-3 h-3" />
                {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Display Name */}
          <div>
            <Label htmlFor="displayName" className="block mb-3 font-medium">
              Display Name *
            </Label>
            <Input
              id="displayName"
              type="text"
              value={formData.displayName}
              placeholder="Enter your display name"
              name="displayName"
              onChange={handleChange}
              className={`${errors.displayName ? "border-red-500" : ""}`}
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                <CircleAlert className="w-3 h-3" />
                {errors.displayName}
              </p>
            )}
          </div>

          {/* Contact List */}
          <div>
            <Label className="block mb-3 font-medium">
              Emergency Contacts *
            </Label>
            {formData.contact_list?.map((contact, i) => (
              <div key={i} className="space-y-2 mb-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Contact name"
                      name="name"
                      value={contact.name}
                      onChange={(e) => handleContactList(i, e)}
                      className={`${
                        errors.contact_list?.[i]?.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.contact_list?.[i]?.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-2">
                        <CircleAlert className="w-3 h-3" />
                        {errors.contact_list[i].name}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      type="tel"
                      placeholder="Contact number"
                      value={contact.number}
                      name="number"
                      onChange={(e) => handleContactList(i, e)}
                      className={`${
                        errors.contact_list?.[i]?.number ? "border-red-500" : ""
                      }`}
                    />
                    {errors.contact_list?.[i]?.number && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-2">
                        <CircleAlert className="w-3 h-3" />
                        {errors.contact_list[i].number}
                      </p>
                    )}
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
              {formData.contact_list.length > 1 && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={removeContact}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  - Remove
                </Button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full mt-1" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
