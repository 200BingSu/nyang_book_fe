import axios from "axios";
import { baseUrl } from "../constants/url";

export const insertData = async (data: string, payload: any) => {
  try {
    const res = await axios.post(`${baseUrl}/${data}/insert`, payload);
    const resData = await res.data;
    if (resData.message === "OK") {
      return resData;
    } else {
      return null;
    }
  } catch (error) {
    console.log("insertData", error);
  }
};

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
    console.log("updateData", error);
  }
};

export const deleteData = async (data: string, payload: any) => {
  try {
    const res = await axios.delete(`${baseUrl}/${data}/delete`, {
      data: payload,
    });

    const resData = await res.data;
    if (resData.message === "OK") {
      return resData;
    } else {
      return null;
    }
  } catch (error) {
    console.log("deleteData", error);
  }
};
