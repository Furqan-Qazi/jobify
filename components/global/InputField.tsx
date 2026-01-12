import React from "react";
import { LucideIcon } from "lucide-react";

interface InputFieldProps {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  type?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  setValue,
  placeholder = "",
  type = "text",
  icon: Icon,
  iconPosition = "left",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) setValue(e.target.value);
  };

  const paddingClass = Icon
    ? iconPosition === "left"
      ? "pl-10"
      : "pr-10"
    : "";

  return (
    <div className="w-full relative">
      {Icon && iconPosition === "left" && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 ${paddingClass} rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-lime-500`}
      />
      {Icon && iconPosition === "right" && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default InputField;
