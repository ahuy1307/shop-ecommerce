import {BiSearch} from "react-icons/bi";

export const listSearchTrending = [
    {
        name: "shirt",
        url: "/",
        icon: BiSearch
    },
    {
        name: "jean",
        url: "/",
        icon: BiSearch

    },
    {
        name: "short",
        url: "/",
        icon: BiSearch
    }
]

export const apiUrl: string = "http://localhost:8080/api";
export const currentUrl: string = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "...";
