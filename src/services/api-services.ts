import axios from "axios";
import { IBooks, ROOT } from "./types";

const api = axios.create({
  baseURL: ROOT,
  headers: {
    "access-control-allow-origin": "*",
    "Content-type": "application/json; charset=UTF-8",
  },
});

export const callGetAPI = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export const callGetPaginatedAPI = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export const callPostAPI = async (url: string, data: IBooks) => {
  const response = await api.post(url, data);
  return response.data;
};
export const callUpdateAPI = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};
