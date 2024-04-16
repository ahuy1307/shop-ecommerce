import {UUID} from "node:crypto";

export interface UserData {
    id: UUID,
    name: string,
    email: string,
    avatar: string,
    gender: string,
    phone: string,
    dateOfBirth: Date,
    address: string,
    role: string
}