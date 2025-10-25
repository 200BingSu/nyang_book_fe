import axios from "axios";
import { baseUrl } from "../constants/url";
import type { AppDispatch } from "../store/store";

const mapping = "service";

export const selectAllServiceWithUserType = async (user_type: string) => {
  const payload = {
    user_type: user_type,
  };
  try {
    const res = await axios.post(
      `${baseUrl}/${mapping}/selectAllServiceWithUserType`,
      payload,
    );
    const data = res.data;
    if (res.status === 200 && data.message === "OK") {
      return data.dataList;
    }
    return res;
  } catch (error) {
    console.error(`selectAllServiceWithUserType`, error);
  }
};
