import axios from "axios";
import { baseUrl } from "../constants/url";

const mapping = "product";

export const selectProduct = async () => {
  try {
    const res = await axios.post(`${baseUrl}/${mapping}/selectProduct`);
    const data = await res.data;
    if (data.message === "OK") {
      return data;
    }
  } catch (error) {
    console.log("selectProduct", error);
    return null;
  }
};
