import axios from "axios";

export const baseAxios = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
