import axiosInstance from "@/helpers/axiosInstance";

export const getCategory = async (id: number) => {
    return await axiosInstance.get(`/category/${id}`).then(res => res.data)
}