import React, { useEffect, useRef, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { PiCaretDownBold } from "react-icons/pi";
import { useDebugState } from "../../util/useConsoleState";
import type { CustomTableI, PropsI } from "../../types/IComponent";
import type { columnI, optionI } from "../../types/SearchInterface";

interface DashBoardItemProps extends PropsI {
  title: string;
  subTitle?: string;
  data: string;
  columnList?: columnI[];
  optionList?: optionI[];
  addBtn: boolean;
  onClickAddBtn: () => void;
  isSelectBox: boolean;
  openKeyRef: React.RefObject<string>;
  onClickOption: () => void;
}

const DashBoardItem: React.FC<DashBoardItemProps> = ({
  title,
  subTitle,
  data,
  columnList = [{ column_name: "", column_value: "" }],
  addBtn = true,
  onClickAddBtn = () => {},
  isSelectBox = true,
  openKeyRef,
  optionList = [
    {
      option_name: "option_name",
      option_value: "option_value",
      option_sort: "ASC",
    },
  ],
  onClickOption = (item: optionI) => {
    console.log("click item:", item);
  },
  children,
}) => {
  // useRef
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  // useState
  const [isOpenSelectBox, setIsOpenSelectBox] = useState(false);
  const [nowOption, setNowOption] = useState<optionI>(optionList[0]);

  // children
  const propsChildren = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<{
          data?: string;
          nowOption?: optionI;
          columnList: columnI[];
        }>,
        {
          data,
          nowOption,
          columnList,
        },
      )
    : children;

  const handleOpenSelectBox = () => {
    openKeyRef.current = `${title}`;
    setIsOpenSelectBox(!isOpenSelectBox);
  };

  const handleClickOption = (item: optionI) => {
    setNowOption(item);
    setIsOpenSelectBox(false);
  };

  useEffect(() => {
    const nowKey = openKeyRef.current;
    const componentKey = `${title}`;
    if (nowKey === "") {
      return;
    }
    if (nowKey !== componentKey) {
      setIsOpenSelectBox(false);
    }
  }, [openKeyRef]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (selectBoxRef.current && !selectBoxRef.current.contains(target)) {
        setIsOpenSelectBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboardItem flex-1 h-full flex flex-col gap-2">
      {/* header */}
      <div className="flex justify-between">
        <div className="flex items-end gap-2">
          <div className="flex items-end gap-1">
            <h3 className="text-[18px] font-semibold text-stone-700">
              {title}
            </h3>
            {subTitle && (
              <p className="text-[12px] font-light text-stone-400">
                {subTitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isSelectBox && (
            <div className="relative " ref={selectBoxRef}>
              <button
                type="button"
                onClick={handleOpenSelectBox}
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-stone-200"
              >
                <p>{nowOption.option_name}</p>
                <div
                  className={`transition-all duration-200 ${
                    isOpenSelectBox ? "-rotate-180" : ""
                  }`}
                >
                  <PiCaretDownBold />
                </div>
              </button>

              <div
                className={`absolute top-full left-0 transition-all duration-100 min-w-full
                    ${
                      isOpenSelectBox
                        ? "mt-1 bg-white shadow-lg border border-stone-200 rounded-md"
                        : "h-0 overflow-hidden "
                    }`}
              >
                <ul>
                  {optionList.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          onClickOption(item);
                          handleClickOption(item);
                        }}
                        className="px-2 py-1 no-drag cursor-pointer hover:bg-stone-200 text-sm text-nowrap"
                      >
                        {item.option_name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          {addBtn && (
            <div className="">
              <button
                type="button"
                className="bg-orange-500 size-5 rounded-full flex items-center justify-center transition-all duration-200  hover:bg-orange-600 "
                onClick={() => onClickAddBtn}
              >
                <BiPlus className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* body */}
      <div className="border border-stone-200 bg-white rounded-lg">
        {propsChildren}
      </div>
    </div>
  );
};

export default DashBoardItem;
