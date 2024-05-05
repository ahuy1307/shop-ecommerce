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
    address: string,
    role: string
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
    dateOfBirth: Date,
    phone: string,
}
