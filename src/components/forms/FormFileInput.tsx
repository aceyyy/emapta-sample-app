import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface FormFileInputProps<T extends FieldValues> {
  name: Path<T>;
  fileName: string;
  setFileName: (item: string) => void;
  label?: string;
  required?: boolean;
  extraValidations?: Record<string, any>;
  disabled?: boolean;
}

const FormFileInput = <T extends FieldValues>({
  name,
  fileName,
  setFileName,
  label,
  required = true,
  extraValidations,
  disabled = false,
}: FormFileInputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name as string);
    }
  };

  return (
    <div>
      <label
        htmlFor={name}
        className={`h-16 w-full mt-8 p-4 sm:p-5 inline-flex items-center justify-center gap-x-2 text-md font-medium rounded-lg border border shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
        bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer
        ${disabled ? "opacity-50 cursor-none" : ""}
        ${errors[name] ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
      >
        {fileName ? fileName : label || "UPLOAD AVATAR"}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={name}
              type="file"
              className="hidden"
              {...field}
              onChange={(e) => {
                onChangeFile(e);
                field.onChange(e);
              }}
              disabled={disabled}
            />
          )}
          rules={{
            required: required ? "This field is required." : "",
            ...extraValidations,
          }}
        />
      </label>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default FormFileInput;