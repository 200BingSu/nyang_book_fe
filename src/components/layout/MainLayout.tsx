import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthListener from "../../page/login/AuthListener";
import { supabase } from "../../page/login/loginApi";
import SideBar from "./menu/SideBar";
import SearchAndUser from "./SearchAndUser/SearchAndUser";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { resetMessage } from "../../features/messageSlice";
import type { NoticeType } from "antd/es/message/interface";

const MainLayout = () => {
  // navigate
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const displayNoneContent = ["/login", "/sign_up"];

  // redux
  const dispatch = useDispatch();
  const messageState = useSelector((state: RootState) => state.message);

  // antD
  const [messageApi, contextHolder] = message.useMessage();
  const key = "message_api";
  const openMessage = (
    type: NoticeType = "success",
    content: string = "성공!",
  ) => {
    messageApi.open({
      key,
      type: type,
      content: content,
      duration: 1,
      style: {
        marginTop: "20vh",
      },
    });
    dispatch(resetMessage());
  };

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

  useEffect(() => {
    if (messageState.isOpenMessage) {
      openMessage(messageState.type, messageState.content);
    }
  }, [messageState.isOpenMessage]);
  return (
    <div className="bg-stone-50 w-full h-screen p-4 flex gap-4 justify-center items-center">
      {contextHolder}
      <AuthListener />
      {!displayNoneContent.find(item => item === path) && <SideBar />}
      <section className="flex-1 flex flex-col h-full gap-4">
        {!displayNoneContent.find(item => item === path) && <SearchAndUser />}
        <main className="flex-1 h-full">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default MainLayout;
