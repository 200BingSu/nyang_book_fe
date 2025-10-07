import { useEffect, useState } from "react";
import { PiCat, PiPawPrintFill, PiSidebarSimple } from "react-icons/pi";
import { selectUserInfo } from "../../../api/userApi";
import { selectAllServiceWithUserType } from "../../../api/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { setList } from "../../../features/serviceSlice";
import { BiHome } from "react-icons/bi";
import { FaChevronCircleRight, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  // navigate
  const navigate = useNavigate();
  // redux
  const dispatch = useDispatch();
  const serviceState = useSelector((state: RootState) => state.service);

  // storage
  const userInfo = localStorage.getItem("sb-thhgocbevdvidduyhwid-auth-token");
  const user = userInfo ? JSON.parse(userInfo).user : {};
  const userKey = user.id ?? "";

  // state
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const [openService, setOpenService] = useState({
    main_menu: "",
    sub_menu: "",
  });

  // service
  const fetchServiceList = async () => {
    try {
      const userInfo = await selectUserInfo(userKey);
      if (userInfo && userInfo.user_type) {
        const serviceList = await selectAllServiceWithUserType(
          userInfo.user_type,
        );
        dispatch(setList(serviceList));
      }
    } catch (error) {
      console.error(`fetchServiceList`, error);
    }
  };

  useEffect(() => {
    fetchServiceList();
  }, []);
  const folderStyle = (isOpen: boolean) => {
    const base =
      "inline-block overflow-hidden whitespace-nowrap transition-transform duration-300";
    return isOpen
      ? `${base} max-w-max opacity-100 `
      : `${base} max-w-0 opacity-0 `;
  };

  return (
    <div
      className={`
        relative bg-white rounded-lg px-2 py-8 flex flex-col items-center gap-8 border border-stone-200
        transition-all  duration-300 ease-in-out
        min-h-full overflow-y-auto
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
          isOpenSideBar ? "gap-1 " : "gap-0"
        }`}
      >
        <PiPawPrintFill className="text-[32px]" />
        <p
          className={`text-2xl m-0
          ${folderStyle(isOpenSideBar)}
          `}
        >
          NyangBook
        </p>
      </button>

      {/* 메뉴 리스트 */}
      <div className="w-full">
        {serviceState.serviceList?.map((service, index) => {
          if (service.service_type === "sub_menu") {
            return null;
          }
          return (
            <div key={index} className="w-full ">
              {/* MAIN */}
              <button
                type="button"
                className={`p-3 w-full flex items-center  ${
                  openService.main_menu === service.service_en
                    ? "text-orange-600 bg-stone-100"
                    : "text-orange-500"
                } ${isOpenSideBar ? "justify-between" : "justify-center"}`}
                onClick={() => {
                  setOpenService(prev => ({
                    ...prev,
                    main_menu: service.service_en,
                  }));
                  if (service.childService.length > 0) {
                    if (service.service_type === "home") {
                      navigate("/");
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
                  <i className="size-7">
                    <PiCat className="w-full h-full" />
                  </i>
                  <p
                    className={`text-lg font-semibold ${folderStyle(
                      isOpenSideBar,
                    )}`}
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
                      ${
                        openService.main_menu === service.service_en
                          ? "rotate-90"
                          : ""
                      }`}
                    >
                      <FaChevronRight />
                    </i>
                  )}
              </button>
              {/* sub */}
              {service.service_type === "main_menu" &&
                service.childService.map((childService, childIndex) => {
                  return (
                    <div key={childIndex}>
                      <button
                        type="button"
                        onClick={() => {
                          navigate(
                            `/${service.service_en}/${childService.service_en}`,
                          );
                        }}
                      >
                        <i></i>
                        {childService.service_name}
                      </button>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
