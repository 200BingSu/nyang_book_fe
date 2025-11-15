import axios from "axios";
import { baseUrl } from "../constants/url";

export const updateData = async (data: string, payload: any) => {
  try {
    const res = await axios.patch(`${baseUrl}/${data}/update`, payload);
    const resData = await res.data;
    return data;
  } catch (error) {
    console.log("updateDiary", error);
  }
};
