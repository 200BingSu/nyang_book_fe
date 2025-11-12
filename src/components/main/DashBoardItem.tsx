import React, { useEffect, useRef, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { PiCaretDownBold } from "react-icons/pi";
import { useDebugState } from "../../util/useConsoleState";

interface optionI {
  option_name: string;
  option_value: string;
}

interface DashBoardItemProps {
  title: string;
  subTitle: string;
  addBtn: boolean;
  onClickAddBtn: () => void;
  isSelectBox: boolean;
  openKeyRef: React.RefObject<string>;
  optionList: optionI[];
  onClickOption: () => void;
}

const DashBoardItem: React.FC<DashBoardItemProps> = ({
  title,
  subTitle,
  addBtn = true,
  onClickAddBtn = () => {},
  isSelectBox = true,
  openKeyRef,
  optionList = [{ option_name: "option_name", option_value: "option_value" }],
  onClickOption = (item: optionI) => {
    console.log("click item:", item);
  },
}) => {
  // useState
  const [isOpenSelectBox, setIsOpenSelectBox] = useState(false);
  const [nowOption, setNowOption] = useState<optionI>(optionList[0]);

  const handleOpenSelectBox = () => {
    openKeyRef.current = `${title}`;
    setIsOpenSelectBox(!isOpenSelectBox);
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

  return (
    <div className="dashboardItem flex-1 h-full">
      <div className="flex justify-between">
        <div className="flex items-end gap-2">
          <h3 className="text-[18px] font-semibold text-stone-700">{title}</h3>
          {subTitle && (
            <p className="text-[12px] font-light text-stone-400">{subTitle}</p>
          )}
          {isSelectBox && (
            <div className="relative ">
              <button
                type="button"
                onClick={handleOpenSelectBox}
                className="flex items-center gap-2"
              >
                <p>{nowOption.option_name}</p>
                <div
                  className={`transition-all duration-200 ${
                    isOpenSelectBox ? "" : "-rotate-180"
                  }`}
                >
                  <PiCaretDownBold />
                </div>
              </button>

              <div
                className={`absolute top-full left-0 transition-all duration-100
                    ${
                      isOpenSelectBox
                        ? "mt-1 bg-white shadow-md border border-stone-100 rounded-md"
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
                        }}
                        className="px-2 py-1 no-drag hover:bg-stone-100"
                      >
                        {item.option_name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div>
          {addBtn && (
            <div className="px-1 py-[2px]">
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
    </div>
  );
};

export default DashBoardItem;
