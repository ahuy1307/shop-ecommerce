import {UUID} from "node:crypto";


export interface UserData {
    id: UUID,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    gender: string,
    phone: string,
    dateOfBirth: Date,
    addresses: Address[],
    role: string
}

export interface Address {
    id?: number
    namePerson: string,
    phone: string
    province: string,
    district: string,
    ward: string,
    currentAddress: string
    default?: boolean
    userId: string
}

export interface DetailPhone {
    root: string
    country: string
    flag: string
}

export interface UserUpdate {
    firstName: string,
    lastName: string,
    gender: string,
    dateOfBirth: Date | null,
    phone: string,
}

export interface Province {
    province_id: string,
    province_name: string,
    province_type: string,
}

export interface District {
    district_id: string,
    district_name: string,
}


export interface Ward {
    ward_id: string,
    ward_name: string,
}
