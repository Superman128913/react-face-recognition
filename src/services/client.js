import axios from "axios";

export const server_url = "http://localhost:8000";

export const client = axios.create({
  baseURL: `${server_url}`,
});
