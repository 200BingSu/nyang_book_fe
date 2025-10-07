import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthListener from "../../page/login/AuthListener";
import { supabase } from "../../page/login/loginApi";
import SideBar from "./menu/SideBar";

const MainLayout = () => {
  // navigate
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const displayNoneSideBar = ["/login", "/sign_up"];

  // 로그인 상태 감지 + 세션 복원
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // console.log("Auth event:", event);
        if (event === "SIGNED_OUT") {
          navigate("/login");
        }
        if (event === "SIGNED_IN") {
          navigate("/"); // 로그인 후 메인으로 이동
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="bg-stone-100 w-full min-h-screen p-4 flex gap-4 justify-center items-center">
      <AuthListener />
      {!displayNoneSideBar.find(item => item === path) && <SideBar />}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
