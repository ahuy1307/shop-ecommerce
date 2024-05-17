"use client"

import {createContext, ReactNode, useContext, useEffect} from "react";
import {District, Province, Ward} from "@/interface";
import axios from "axios";

type LocationProps = {
    getAllProvinces: () => Promise<Province[] | undefined>
    getDistrictsByProvince: (provinceId: string) => Promise<District[] | undefined>
    getWardsByDistrict: (districtId: string) => Promise<Ward[] | undefined>
}

const LocationContext = createContext({} as LocationProps)

export function useLocation() {
    return useContext(LocationContext)
}

function LocationProvider({children}: { children: ReactNode }) {

    const getAllProvinces = async () => {
        try {
            const res = await axios.get(`https://vapi.vnappmob.com/api/province/`)
            const result: Province[] = []
            res.data.results.forEach((province: Province) => {
                let provinceType = province.province_type
                if (provinceType != "Tỉnh")
                    provinceType = "Thành phố"
                result.push({
                    province_id: province.province_id,
                    province_name: province.province_name.substring(provinceType.length + 1),
                    province_type: province.province_type
                })
            })
            return result.sort((a, b) => a.province_name.localeCompare(b.province_name))
        } catch (error) {
            console.log(error)
        }
    }

    const getDistrictsByProvince = async (provinceId: string) => {
        try {
            const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
            const result: District[] = []
            res.data.results.forEach((district: District) => {
                result.push({
                    district_id: district.district_id,
                    district_name: district.district_name
                })
            })

            return result
        } catch (error) {
            console.log(error)
        }
    }

    const getWardsByDistrict = async (districtId: string) => {
        try {
            const res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
            const result: Ward[] = []
            res.data.results.forEach((ward: Ward) => {
                result.push({
                    ward_id: ward.ward_id,
                    ward_name: ward.ward_name
                })
            })

            return result
        } catch (error) {
            console.log(error)
        }
    }

    return <LocationContext.Provider value={{
        getAllProvinces,
        getDistrictsByProvince,
        getWardsByDistrict
    }}>
        {children}
    </LocationContext.Provider>
}

export default LocationProvider
