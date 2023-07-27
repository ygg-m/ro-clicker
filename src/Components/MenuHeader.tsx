import { CloseIcon, MinusIcon, QuestionIcon } from "@/Assets/UI";

interface Props {
  name: string;
  minimizeButton?: boolean;
  closeButton?: boolean;
  onMouseDown: any;
  onMouseMove: any;
  onMouseUp: any;
}

export const MenuHeader = ({
  name,
  minimizeButton,
  closeButton,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}: Props) => {
  return (
    <header
      className="bg-menu-header flex cursor-grab items-center justify-between gap-2 border-b border-gray-800 p-[2px] px-3"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div className="flex items-center gap-2">
        <div className="bg-menu-header-button grid h-4 w-4 cursor-pointer place-items-center rounded-full outline outline-1 outline-gray-600 duration-100 hover:text-blue-50">
          <QuestionIcon className="h-3 w-3" />
        </div>
        {name}
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-menu-header-button grid h-4 w-4 cursor-pointer place-items-center rounded-full outline outline-1 outline-gray-600 duration-100 hover:text-blue-50">
          <MinusIcon className="h-3 w-3" />
        </div>
        <div className="bg-menu-header-button grid h-4 w-4 cursor-pointer place-items-center rounded-full outline outline-1 outline-gray-600 duration-100 hover:text-blue-50">
          <CloseIcon className="h-3 w-3" />
        </div>
      </div>
    </header>
  );
};
