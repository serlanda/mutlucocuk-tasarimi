"use client";

import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, success, className = "", ...props }, ref) => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 transition-colors";
    const stateClasses = error 
      ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
      : success
      ? "border-green-300 focus:border-green-500 focus:ring-green-500"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
    
    return (
      <input
        ref={ref}
        className={`${baseClasses} ${stateClasses} ${className}`}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;