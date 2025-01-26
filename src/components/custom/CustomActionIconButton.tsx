import { FC, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  onClick: () => void;
}

const CustomActionIconButton: FC<Props> = ({ icon, onClick }) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center text-gray-500 hover:text-gray-700`}
      onClick={onClick}>
      {icon}
    </button>
  )
}

export default CustomActionIconButton;