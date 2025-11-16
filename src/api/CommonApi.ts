import axios from "axios";
import { baseUrl } from "../constants/url";

export const updateData = async (data: string, payload: any) => {
  try {
    const res = await axios.put(`${baseUrl}/${data}/update`, payload);
    const resData = await res.data;
    if (resData.message === "OK") {
      return resData;
    } else {
      return null;
    }
  } catch (error) {
    console.log("updateDiary", error);
  }
};
