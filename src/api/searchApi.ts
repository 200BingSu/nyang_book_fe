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
  orderBy: string | null | undefined,
  sortOrder: string | null | undefined,
  key: number | null | undefined,
) => {
  const payload = new URLSearchParams({
    query: query ?? "",
    orderBy: orderBy ?? "",
    sortOrder: sortOrder ?? "",
    key: key ? key.toString() : "",
  });
  try {
    const res = await axios.get(
      `${baseUrl}/${mapping}/dataList?${payload.toString()}`,
    );

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
