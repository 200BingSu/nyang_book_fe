import { useState } from "react";
import { PiPawPrintFill, PiSidebarSimple } from "react-icons/pi";

const SideBar = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);

  const folderStyle = (isOpen: boolean) => {
    const base =
      "inline-block overflow-hidden whitespace-nowrap transition-transform duration-300";
    return isOpen
      ? `${base} max-w-max opacity-100 ml-2`
      : `${base} max-w-0 opacity-0 ml-0`;
  };

  return (
    <div
      className={`
        relative bg-white rounded-lg px-2 py-8 flex flex-col items-center gap-8 border border-stone-200
        transition-all  duration-300 ease-in-out
        
      `}
    >
      {/* 토글 버튼 */}
      <button
        type="button"
        className="absolute text-stone-500 top-3 right-3"
        onClick={() => setIsOpenSideBar(!isOpenSideBar)}
      >
        <PiSidebarSimple />
      </button>

      {/* 로고/버튼 */}
      <button
        type="button"
        title="NyangBook"
        className={`font-adlam px-1 py-6 flex items-center text-orange-600 transition-all duration-300 ${
          isOpenSideBar ? "gap-2 " : "gap-0"
        }`}
      >
        <PiPawPrintFill className="text-[32px]" />
        <p
          className={`text-2xl  
          ${folderStyle(isOpenSideBar)}
          `}
        >
          NyangBook
        </p>
      </button>

      {/* 메뉴 리스트 */}
    </div>
  );
};

export default SideBar;
