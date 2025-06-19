//

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { CircleAlert } from 'lucide-react';
// Define the form state interface
interface FormState {
  email: string;
  password: string;
  acceptTerms: boolean;
  isSubmitting: boolean;
  errors: {
    email?: string;
    password?: string;
    terms?: string;
    submit?: string;
  };
}

// Initial state
const initialState: FormState = {
  email: "",
  password: "",
  acceptTerms: false,
  isSubmitting: false,
  errors: {},
};

function Login() {
  const [formState, setFormState] = useState<FormState>(initialState);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Phone validation regex (basic pattern for various formats)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

  // Update form field
  const updateField = (
    field: keyof Omit<FormState, "errors" | "isSubmitting">,
    value: string | boolean
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: undefined, // Clear field error when updating
      },
    }));
  };

  // Update form errors
  const setErrors = (errors: FormState["errors"]) => {
    setFormState((prev) => ({
      ...prev,
      errors,
    }));
  };

  // Set submitting state
  const setIsSubmitting = (isSubmitting: boolean) => {
    setFormState((prev) => ({
      ...prev,
      isSubmitting,
    }));
  };

  // Clear specific field error
  const clearFieldError = (field: keyof FormState["errors"]) => {
    if (formState.errors[field]) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [field]: undefined,
        },
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormState["errors"] = {};

    // Email/Phone validation
    if (!formState.email.trim()) {
      newErrors.email = "Email or phone number is required";
    } else if (
      !emailRegex.test(formState.email) &&
      !phoneRegex.test(formState.email.replace(/[\s\-\(\)]/g, ""))
    ) {
      newErrors.email = "Please enter a valid email address or phone number";
    }

    // Password validation
    if (!formState.password) {
      newErrors.password = "Password is required";
    } else if (formState.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Terms acceptance validation
    if (!formState.acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle successful login here
      console.log("Login successful", {
        email: formState.email,
        password: formState.password,
        acceptTerms: formState.acceptTerms,
      });

      // Reset form to initial state
      setFormState(initialState);
    } catch (error) {
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField("email", e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField("password", e.target.value);
  };

  const handleTermsChange = (checked: boolean) => {
    updateField("acceptTerms", checked);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-screen bg-gray-50 px-4">
        <div className="bg-white border border-gray-200 shadow-lg p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-center text-3xl mb-8 font-bold text-gray-900">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Phone Field */}
            <div>
              <Label
                htmlFor="email"
                className={`block text-sm font-medium mb-2`}
              >
                Email or Phone
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email or phone"
                value={formState.email}
                onChange={handleEmailChange}
                className={`w-full ${
                  formState.errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-invalid={formState.errors.email ? "true" : "false"}
                aria-describedby={
                  formState.errors.email ? "email-error" : undefined
                }
              />
              {formState.errors.email && (
                <p
                  id="email-error"
                  className="mt-2 text-sm text-red-600 flex gap-2 items-center"
                >
                 <CircleAlert className="w-3 h-3"/>
                  {formState.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 `}
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formState.password}
                onChange={handlePasswordChange}
                className={`w-full ${
                  formState.errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-invalid={formState.errors.password ? "true" : "false"}
                aria-describedby={
                  formState.errors.password ? "password-error" : undefined
                }
              />
              {formState.errors.password && (
                <p
                  id="password-error"
                  className="mt-2 text-sm text-red-600 flex gap-2 items-center"
                >
                   <CircleAlert className="w-3 h-3"/>
                  {formState.errors.password}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="checkbox"
                  checked={formState.acceptTerms}
                  onCheckedChange={handleTermsChange}
                  className="border-1 border-black"
                />
                <Label
                  htmlFor="checkbox"
                  className={`text-sm leading-5 cursor-pointer`}
                >
                  I accept the{" "}
                  <Link
                    to="/terms"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Terms and Conditions
                  </Link>
                </Label>
              </div>
              {formState.errors.terms && (
                <p className="text-sm text-red-600 flex gap-2 items-center">
                   <CircleAlert className="w-3 h-3"/>
                  {formState.errors.terms}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {formState.errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formState.errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full  disabled:bg-gray-300"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
               <div className="w-full text-center mt-5 mb-5">
                <p>or</p>
               </div>
              {/* Goggle Login.. */}
               <Button variant="outline"
               className="w-full">
                Countinue With Google
               </Button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
