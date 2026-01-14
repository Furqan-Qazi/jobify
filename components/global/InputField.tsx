import React from "react";
import { LucideIcon } from "lucide-react";

interface InputFieldProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  error?: string | null;
  autoComplete?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  value,
  setValue,
  type = "text",
  placeholder = "",
  icon: Icon,
  iconPosition = "left",
  className = "",
  error = null,
  autoComplete,
  disabled = false, // ✅ default false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof setValue === "function") {
      setValue(e.target.value);
      return;
    }
  };

  const hasIcon = Boolean(Icon);
  const paddingClass = hasIcon
    ? iconPosition === "left"
      ? "pl-10"
      : "pr-10"
    : "";
  const borderClass = error ? "border-red-500" : "border-gray-300";

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id ?? name}
          className="block text-sm font-medium text-gray-500 ms-1"
        >
          {label}
        </label>
      )}

      <div className="mt-2 relative">
        {hasIcon && iconPosition === "left" && Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled} // ✅ add disabled here
          className={`w-full px-3 py-2 ${paddingClass} rounded-lg border outline-none transition text-gray-700 focus:ring-2 focus:ring-lime-500 ${borderClass}`}
        />

        {hasIcon && iconPosition === "right" && Icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
