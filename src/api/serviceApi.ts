import axios from "axios";
import { baseUrl } from "../constants/url";
import type { AppDispatch } from "../store/store";

export const selectAllServiceWithUserType = async (
  user_type: string,
  dispatch: AppDispatch,
) => {
  const payload = {
    user_type: user_type,
  };
  try {
    const res = await axios.post(
      `${baseUrl}/selectAllServiceWithUserType`,
      payload,
    );
    console.log("res", res);

    return res;
  } catch (error) {
    console.error(`selectAllServiceWithUserType`, error);
  }
};
