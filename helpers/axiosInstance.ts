import axios from "axios";
import {apiUrl} from "@/constant";

const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
});

export default axiosInstance;
