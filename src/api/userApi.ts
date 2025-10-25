import axios from "axios";
import { baseUrl } from "../constants/url";

const mapping = "user";

export const selectUserInfo = async (id: string) => {
  const payload = { id };
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
