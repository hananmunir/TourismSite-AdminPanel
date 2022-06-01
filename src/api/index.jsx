import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8800/api/",
});
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
  "TourismSecurityToken"
);
const token = localStorage.getItem("TourismSecurityToken");

const config = {
  headers: { "content-type": "multipart/form-data" },
  Authorization: `${token}`,
};

export const fetchPackages = (perPage = 20) =>
  API.get("/packages?perPage=" + perPage);
export const fetchPackage = (id) => API.get("/packages/" + id);
export const deletePackage = (id) => API.delete("/packages/" + id);
export const createPackage = (formdata) =>
  API.post("/packages", formdata, config);
export const signIn = (email, password) =>
  API.post("/users/signin", { email, password });

export const fetchUsers = (perPage = 20) =>
  API.get("/users?perPage=" + perPage, config);
