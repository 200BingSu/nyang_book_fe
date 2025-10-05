import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./menu/SideBar";
import AuthListener from "../../page/login/AuthListener";
import { useEffect, useState } from "react";
import { supabase } from "../../page/login/loginApi";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const displayNoneSideBar = ["/login", "/sign_up"];

  const [user, setUser] = useState<any>(null);

  // 로그인 상태 감지 + 세션 복원
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
      }
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event);
        if (event === "SIGNED_OUT") {
          setUser(null);
          navigate("/login");
        }
        if (event === "SIGNED_IN") {
          setUser(session?.user ?? null);
          navigate("/"); // 로그인 후 메인으로 이동
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // 로그아웃 처리
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert("로그아웃 실패: " + error.message);
  };

  return (
    <div className="bg-stone-100 w-full h-screen p-4 flex gap-4 justify-center items-center">
      <AuthListener />
      {!displayNoneSideBar.find(item => item === path) && <SideBar />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
