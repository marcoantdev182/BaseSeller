import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const fieldClassName =
  "surface-line min-h-12 w-full rounded-md bg-black/25 px-4 text-white outline-none transition duration-300 placeholder:text-white/35 focus:border-[var(--cyan)] focus:bg-black/40";

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="grid gap-2 text-sm text-white/72">
      <span>{label}</span>
      <input className={`${fieldClassName} ${className}`} {...props} />
      {error ? <span className="text-[#ffb6a1]">{error}</span> : null}
    </label>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function TextArea({ label, className = "", ...props }: TextAreaProps) {
  return (
    <label className="grid gap-2 text-sm text-white/72">
      <span>{label}</span>
      <textarea
        className={`${fieldClassName} min-h-32 resize-y py-3 ${className}`}
        {...props}
      />
    </label>
  );
}

