import axios from "axios";
import { baseUrl } from "../constants/url";
import type { ServiceVO } from "../types/ServiceVO";

interface OrderByI {
  orderBy: string;
  sortOrder: string;
}

const mapping = "search";

export const getSearchWithQuery = async (text: string) => {
  const payload = new URLSearchParams({
    query: text,
  });
  try {
    const res = await axios.get(
      `${baseUrl}/${mapping}/searchBar?${payload.toString()}`,
    );
    const data = await res.data;
    if (data.message === "OK") {
      return data;
    } else {
      return { serviceVOList: [], dataList: [] };
    }
  } catch (error) {
    console.log("getSearchWithQuery", error);
    return { serviceVOList: [], dataList: [] };
  }
};

export const getSearchDataList = async (
  query: string | null | undefined,
  orderBy: OrderByI[],
  key: number | null | undefined,
) => {
  const payload = {
    query: query ?? "",
    orderBy: orderBy,
    key: key ? key.toString() : "",
  };
  try {
    const res = await axios.post(`${baseUrl}/${mapping}/dataList`, payload);

    const data = await res.data;
    if (data.message === "OK") {
      return data;
    } else {
      return { serviceVOList: [], dataList: [] };
    }
  } catch (error) {
    console.log("getSearchDataList", error);
    return { serviceVOList: [], dataList: [] };
  }
};
