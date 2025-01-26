import { FC } from "react"

interface Props {
  label: string;
  type?: "default" | "success"
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  extraClassName?: string;
}

const CustomButton: FC<Props> = ({ label, type, loading = false, disabled = false, onClick, extraClassName }) => {
  
  const getClassNameStyleByType = () => {
    switch (type) {
      case "success":
        return "bg-[#5ac96f] border-transparent text-white hover:bg-[#4caf63] focus:outline-none focus:bg-[#4caf63]";
      default:
        return "bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100";
    }
  };

  return (
    <button
      type="submit"
      className={`h-16 mt-8 p-4 sm:p-5 inline-flex items-center justify-center gap-x-2 text-md font-medium rounded-lg border shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
              ${getClassNameStyleByType()}
              ${loading ? "opacity-50" : ""} 
              ${extraClassName ? extraClassName : ""}`}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {label}{loading && (
        <span className="ml-2 animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full">
          <span className="sr-only">Loading...</span>
        </span>
      )}
    </button>
  )
}

export default CustomButton;