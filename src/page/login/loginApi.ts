import axios from "axios";
import { baseUrl } from "../../constants/url";
import type { User } from "../../types/UserVO";
import { createClient, type Session } from "@supabase/supabase-js";

// 회원가입
export const postSignUp = async (user: User) => {
  console.log("user", user);

  try {
    const res = await axios.post(
      `${baseUrl}/user/sign_up`,
      {
        user_id: user.user_id,
        password: user.password,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // 쿠키/세션 필요 시
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// supabase 회원가입
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 현재 유저 정보
export interface AuthInfo {
  session: Session | null;
  user: import("@supabase/supabase-js").User | null;
}

export const getAuthInfo = async (): Promise<AuthInfo> => {
  const { data: sessionData } = await supabase.auth.getSession();
  const { session } = sessionData;

  return {
    session,
    user: session?.user ?? null,
  };
};
