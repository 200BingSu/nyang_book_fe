import axios from "axios";
import { baseUrl } from "../../constants/url";
import type { User } from "./UserVO";

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
