"use client"

import {createContext, ReactNode, useContext, useState} from "react";
import {Address} from "@/interface";
import axiosInstance from "@/helpers/axiosInstance";
import toast from "react-hot-toast";

type AddressType = {
    addAddress: (formData: Address) => Promise<boolean>;
    deleteAddress: (id: number) => Promise<boolean>;
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

    const deleteAddress = async (id: number) => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.delete(`/user/address/${id}`);
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
        deleteAddress
    }}>
        {children}
    </AddressContext.Provider>
}

export default AddressProvider