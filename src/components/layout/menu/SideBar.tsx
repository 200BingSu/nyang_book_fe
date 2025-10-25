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
import { useDebugState } from "../../../util/useConsoleState";
import MainMenuBtn from "./MainMenuBtn";

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

  // useDebugState("openService", openService);

  const folderStyle = (isOpen: boolean): string => {
    const base =
      "inline-block overflow-hidden whitespace-nowrap transition-transform duration-300";
    return isOpen
      ? `${base} max-w-max opacity-100 `
      : `${base} max-w-0 opacity-0 `;
  };

  return (
    <aside
      className={`
        relative bg-white rounded-lg px-2 py-8 flex flex-col items-center gap-8 border border-stone-200
        transition-all  duration-300 ease-in-out
        h-full overflow-y-auto
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
        className={`font-adlam px-2 pt-6 flex items-center text-orange-600 transition-all duration-300 ${
          isOpenSideBar ? "gap-1 " : "gap-0"
        }`}
        onClick={() => {
          navigate("/");
        }}
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
            <MainMenuBtn
              key={index}
              isOpenSideBar={isOpenSideBar}
              service={service}
              folderStyle={folderStyle}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default SideBar;
