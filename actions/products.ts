import axiosInstance from "@/helpers/axiosInstance";

export const getAllProducts = async () => {
    return await axiosInstance.get("/product").then(res => res.data)
}

export const getProductDetail = async (slug: string) => {
    return await axiosInstance.get(`/product/${slug}`).then(res => res.data)
}