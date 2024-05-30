import axiosInstance from "@/helpers/axiosInstance";
import {Address} from "@/interface";

export const getUserAddress = async (userId: string | null | undefined) => {
    if (!userId) return Promise.resolve([])

    return await axiosInstance.get(`/address/user/${userId}`).then(res => res.data)
}

export const deleteUserAddress = async (id: number | undefined) => {
    if (!id) return Promise.resolve(false)
    await axiosInstance.delete(`/address/${id}`)
    return Promise.resolve(true)
}

export const addUserAddress = async (data: Address) => {
    await axiosInstance.post(`/address`, data)
    return Promise.resolve(true)
}

export const updateUserAddress = async (data: Address) => {
    await axiosInstance.put(`/address/${data.id}`, data)
    return Promise.resolve(true)
}