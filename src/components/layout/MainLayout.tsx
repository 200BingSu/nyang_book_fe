import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./menu/SideBar";

const MainLayout = () => {
  const location = useLocation();
  console.log("lo", location);
  const path = location.pathname;

  const displayNoneSideBar = ["/login", "/sign_up"];
  return (
    <div className="bg-stone-100 w-full h-screen p-4 flex gap-4 justify-center items-center">
      {!displayNoneSideBar.find(item => item === path) && <SideBar />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
