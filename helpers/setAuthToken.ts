import axiosInstance from "./axiosInstance";

export function setAuthToken(token: string | null) {
    if (token != null) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common["Authorization"];
}
