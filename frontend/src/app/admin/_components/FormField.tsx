"use client";

import { ReactNode } from "react";
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  helpText?: string;
  children: ReactNode;
}

export default function FormField({ 
  label, 
  htmlFor, 
  required = false, 
  error, 
  success, 
  helpText, 
  children 
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={htmlFor} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {children}
        
        {success && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          </div>
        )}
      </div>
      
      {error && (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}