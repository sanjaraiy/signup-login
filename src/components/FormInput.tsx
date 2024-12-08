import React from 'react';
import { useField } from 'formik';
import { clsx } from 'clsx';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, className, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      <label 
        htmlFor={props.name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={clsx(
          "w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
          hasError ? "border-red-500" : "border-gray-300",
          className
        )}
        aria-invalid={hasError ? "true" : "false"}
        aria-describedby={hasError ? `${props.name}-error` : undefined}
      />
      {hasError && (
        <p 
          className="mt-1 text-sm text-red-600" 
          id={`${props.name}-error`}
          role="alert"
        >
          {meta.error}
        </p>
      )}
    </div>
  );
};