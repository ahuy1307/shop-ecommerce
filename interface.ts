import {UUID} from "node:crypto";

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

export interface Color {
    id: number,
    name: string,
    hexColor: string
}

export interface Size {
    id: number,
    name: string
}

export interface Category {
    id: number,
    name: string,
    description: string
    typePersonId: number
}

export interface ProductDetail {
    id: number,
    name: string,
    price: number
    categoryId: number,
    variants: {
        size: Size,
        colors: {
            color: Color,
            quantityStock: number
            thumbnail: string
        }[]
    }[],
    slug: string
}