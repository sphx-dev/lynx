import axios from "axios";
import { config } from "./config";

export const baseAxios = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
