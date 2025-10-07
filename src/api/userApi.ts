import axios from "axios";
import { baseUrl } from "../constants/url";

const mapping = "user";

export const selectUserInfo = async (user_key: string) => {
  const payload = { user_key };
  try {
    const res = await axios.post(
      `${baseUrl}/${mapping}/selectUserAndPet`,
      payload,
    );
    const data = res.data;
    if (data.message === "OK") {
      return data.dataMap;
    } else {
      return {};
    }
  } catch (error) {
    console.error("selectUserInfo", error);
  }
};
