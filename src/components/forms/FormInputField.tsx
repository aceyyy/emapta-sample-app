import { FieldValues, Path, useFormContext } from "react-hook-form";

interface FormInputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  extraValidations?: Record<string, any>;
  type?: string;
  disabled?: boolean;
}

const FormInputField = <T extends FieldValues>({
  name,
  label,
  required = true,
  placeholder,
  extraValidations,
  type = "text",
  disabled = false,
}: FormInputFieldProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block mb-1 text-sm text-gray-400">
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        id={name}
        className={`py-3 px-4 block w-full border border-solid border-gray-300 rounded-md text-sm focus:border-blue-500 
          focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
            ${errors[name] ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
        placeholder={placeholder}
        {...register(name, { required: required ? "This field is required." : "", ...extraValidations })}
        disabled={disabled}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name]?.message?.toString()}</p>
      )}
    </div>
  )
};

export default FormInputField;