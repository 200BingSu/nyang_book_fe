import axios from "axios";
import { baseUrl } from "../constants/url";
import type { ServiceVO } from "../types/ServiceVO";

interface SearchVO<T> {
  serviceVOList: ServiceVO[];
  dataList: Array<T>;
}

const mapping = "search";

export const getSearchWithQuery = async (text: string) => {
  const payload = new URLSearchParams({
    query: text,
  });
  try {
    const res = await axios.get(
      `${baseUrl}/${mapping}/content?${payload.toString()}`,
    );
    const data = await res.data;
    if (data.message === "OK") {
      return data;
    }
  } catch (error) {
    console.log("getSearchWithQuery", error);
    return [];
  }
};
