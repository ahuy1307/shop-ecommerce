"use client"

import {createContext, useContext, useEffect, useState} from "react";
import {DetailPhone} from "@/interface";
import axiosInstance from "@/helpers/axiosInstance";

type PhoneType = {
    phones: DetailPhone[] | undefined;
    phonesSearch: DetailPhone[] | undefined;
    searchPhone: (value: string) => void;
}

const PhoneContext = createContext({} as PhoneType);

export const usePhone = () => {
    return useContext(PhoneContext)
}

function PhoneProvider({children}: { children: React.ReactNode }) {
    const [phones, setPhones] = useState<DetailPhone[] | undefined>(undefined);
    const [phonesSearch, setPhonesSearch] = useState<DetailPhone[] | undefined>(undefined);

    const getPhones = async () => {
        try {
            const res = await axiosInstance.get(`https://restcountries.com/v3.1/all`);
            const result: DetailPhone[] = []
            res.data.forEach((item: any) => {
                let suffix = item.idd["suffixes"] as string

                if (suffix == undefined)
                    return;

                result.push({
                    root: item.idd.root + suffix[0],
                    country: item.name.common,
                    flag: item.flags.png
                })
            })
            setPhones(result);
            setPhonesSearch(result);
        } catch (error) {
            console.log(error);
        }
    }

    const searchPhone = (value: string) => {
        if (value == "") return setPhonesSearch(phones)
        const result = phones?.filter(phone => phone.country.toLowerCase().includes(value.toLowerCase()))
        setPhonesSearch(result)
    }

    useEffect(() => {
        getPhones();
    }, []);

    return <PhoneContext.Provider value={{phones, searchPhone, phonesSearch}}>
        {children}
    </PhoneContext.Provider>
}

export default PhoneProvider;