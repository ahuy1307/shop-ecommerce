"use client"

import {createContext, ReactNode, useContext, useState} from "react";
import {Address} from "@/interface";
import axiosInstance from "@/helpers/axiosInstance";
import toast from "react-hot-toast";
import {UUID} from "node:crypto";

type AddressUpdate = {
    id: number,
    name: string,
    phone: string
    province: string,
    district: string,
    ward: string,
    currentAddress: string
    isDefault: boolean
    user_id?: UUID
}

type AddressType = {
    addAddress: (formData: Address) => Promise<boolean>;
    deleteAddress: (userId: UUID, id: number) => Promise<boolean>;
    updateAddress: (data: AddressUpdate) => Promise<boolean>;
    isLoading: boolean;
}

const AddressContext = createContext({} as AddressType);

export function useAddress() {
    return useContext(AddressContext);
}

function AddressProvider({children}: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);

    const addAddress = async (formData: Address) => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.post(`/user/address`, formData);
            if (res.data.success) {
                toast.success(res.data.message)
                setIsLoading(false)
                return true
            } else {
                toast.error(res.data.message)
                setIsLoading(false)
            }
        } catch (error) {
            toast.error("Failed to add address")
            setIsLoading(false)
            console.log(error)
        }
        return false
    }

    const deleteAddress = async (userId: UUID, id: number) => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.delete(`/user/address/${userId}/${id}`);
            if (res.data.success) {
                toast.success(res.data.message)
                setIsLoading(false)
                return true
            } else {
                toast.error("Failed to delete address")
                setIsLoading(false)
            }
        } catch (error) {
            toast.error("Failed to delete address")
            setIsLoading(false)
            console.log(error)
        }
        return false
    }

    const updateAddress = async (data: AddressUpdate) => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.post(`/user/address/${data.id}`, data);
            if (res.data.success) {
                toast.success(res.data.message)
                setIsLoading(false)
                return true
            } else {
                toast.error("Failed to delete address")
                setIsLoading(false)
            }
        } catch (error) {
            toast.error("Failed to delete address")
            setIsLoading(false)
            console.log(error)
        }
        return false
    }

    return <AddressContext.Provider value={{
        isLoading,
        addAddress,
        deleteAddress,
        updateAddress
    }}>
        {children}
    </AddressContext.Provider>
}

export default AddressProvider