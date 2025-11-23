import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import type { ServiceVO } from "../../../types/ServiceVO";
import { ICONS } from "../../icons/ICONS";

interface MainMenuBtnProps {
  isOpenSideBar: boolean;

  service: ServiceVO;
  folderStyle: (isOpen: boolean) => {};
}

const MainMenuBtn: React.FC<MainMenuBtnProps> = ({
  isOpenSideBar,

  service,
  folderStyle,
}) => {
  // navigate
  const navigate = useNavigate();
  const location = useLocation();
  const pathArr = location.pathname.split("/");

  const mainMenu = pathArr[1] ? pathArr[1] : "main";
  const subMenu = pathArr[2];

  // icons
  const Icon = ICONS[service.icon ?? "LuCat"];

  // useState
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  return (
    <div className="w-full ">
      {/* MAIN */}
      <button
        type="button"
        title={service.service_name}
        className={`p-3 w-full flex items-center  ${
          mainMenu === service.service_en
            ? `text-orange-600 ${
                service.childService.length > 0
                  ? service.service_type === "home"
                    ? "bg-orange-100"
                    : "bg-orange-50 bg-opacity-70"
                  : "bg-orange-100"
              }`
            : "text-orange-500 hover:bg-orange-50"
        } ${isOpenSideBar ? "justify-between" : "justify-center"}`}
        onClick={() => {
          if (service.childService.length > 0) {
            if (service.service_type === "home") {
              navigate("/");
            } else {
              navigate(
                `/${service.service_en}/${service.childService[0].service_en}`,
              );
              if (mainMenu !== service.service_en) {
                setIsOpenSubMenu(true);
              } else {
                setIsOpenSubMenu(!isOpenSubMenu);
              }
            }
          } else {
            navigate(`/${service.service_en}`);
          }
        }}
      >
        <div
          className={`flex items-center   ${
            isOpenSideBar ? "gap-2" : "justify-center"
          }`}
        >
          <i className="size-6">{Icon && <Icon className="w-full h-full" />}</i>
          <p
            className={`text-base font-semibold ${folderStyle(isOpenSideBar)}`}
          >
            {service.service_name ?? ""}
          </p>
        </div>
        {isOpenSideBar &&
          service.service_type !== "home" &&
          service.childService.length > 0 && (
            <i
              className={`
                      transition-all duration-100
                      ${isOpenSubMenu ? "rotate-90" : ""}`}
            >
              <FaChevronRight />
            </i>
          )}
      </button>
      {/* sub */}
      {service.service_type === "main_menu" &&
        service.childService.map((childService, childIndex) => {
          const SubIcon = ICONS[childService.icon ?? "PiCat"];
          return (
            <div
              key={childIndex}
              className={`overflow-hidden transition-[max-height] duration-100 ease-in-out ${
                isOpenSubMenu
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <button
                type="button"
                title={childService.service_name}
                onClick={() => {
                  navigate(`/${service.service_en}/${childService.service_en}`);
                }}
                className={`flex items-center gap-2  py-2  w-full 
                  ${
                    subMenu === childService.service_en
                      ? "bg-orange-100"
                      : "hover:bg-orange-50"
                  }
                  ${isOpenSideBar ? "pl-8" : "justify-center"}`}
              >
                <i>
                  {SubIcon && (
                    <SubIcon className="text-orange-500 text-base w-5 h-5" />
                  )}
                </i>
                {isOpenSideBar && (
                  <p className="font-semibold text-orange-500 text-base">
                    {childService.service_name}
                  </p>
                )}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default MainMenuBtn;
