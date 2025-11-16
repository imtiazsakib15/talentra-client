/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { UseFormRegister } from "react-hook-form";
import { Textarea } from "./ui/textarea";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  type?: string;
}

export const InputField = ({
  id,
  label,
  placeholder,
  register,
  error,
  type = "text",
}: InputFieldProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={id} className="text-slate-700">
        {label}
      </FieldLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        aria-invalid={!!error}
      />
      {error && <p className="-mt-2 text-xs text-red-600">{error}</p>}
    </Field>
  );
};

interface FormTextAreaProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
}

export const TextAreaField = ({
  id,
  label,
  placeholder,
  register,
  error,
}: FormTextAreaProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={id} className="text-slate-700">
        {label}
      </FieldLabel>
      <Textarea
        id={id}
        {...register(id)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
        rows={3}
        aria-invalid={!!error}
      />
      {error && <p className="-mt-2 text-xs text-red-600">{error}</p>}
    </Field>
  );
};
