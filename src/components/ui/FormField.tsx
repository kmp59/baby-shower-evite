import type { ReactNode } from 'react';
import './FormField.css';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
}

/** Label + control wrapper shared by every field in the RSVP form. */
export function FormField({ label, htmlFor, required, children }: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>
        {label} {required && <span className="form-field__req">*</span>}
      </label>
      {children}
    </div>
  );
}
