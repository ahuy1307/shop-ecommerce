"use client";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useRouter, useSearchParams} from "next/navigation";
import {UserData} from "@/interface";
import axiosInstance from "@/helpers/axiosInstance";
import {apiUrl, currentUrl} from "@/constant";
import {setAuthToken} from "@/helpers/setAuthToken";

type AuthType = {
    user: UserData | undefined;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    checkUser: () => void;
    getAllUrlOauth: () => void;
    logout: () => void;
};

const AuthProvider = createContext({} as AuthType);

export function useAuth() {
    return useContext(AuthProvider);
}

function AuthContextProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<UserData | undefined>(undefined);
    const router = useRouter();

    const searchParams = useSearchParams();
    const code = searchParams.get("code");


    const getAllUrlOauth = async () => {
        if (localStorage.getItem("urlGoogle") != null) return;

        try {
            const resGoogle = await axiosInstance.get(`${apiUrl}/auth/google/url`);
            const resGithub = await axiosInstance.get(`${apiUrl}/auth/github/url`);

            localStorage.setItem("urlGoogle", resGoogle.data);
            localStorage.setItem("urlGithub", resGithub.data);
        } catch (error) {
            console.log(error);
        }
    };

    const generateTokenSocial = async () => {
        let path = "";
        if (localStorage.getItem("type") == "google") {
            path = `auth/google/callback?code=${code}`;
        } else {
            path = `auth/github/callback?code=${code}`;
        }

        try {
            const res = await axiosInstance.get(`${apiUrl}/${path}`);
            if (res.data != null) localStorage.setItem("token", res.data);
            await checkUser();
            console.log(1)
            router.push(currentUrl);
        } catch (error) {
            console.log(error);
        }
    };

    const checkUser = async () => {
        if (localStorage.getItem("token") == null) {
            setUser(undefined);
            return;
        }
        setAuthToken(localStorage.getItem("token"));

        try {
            const res = await axiosInstance.get(`${apiUrl}/auth/user`);

            if (res.data) {
                let userData = {
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone,
                    avatar: res.data.avatar,
                    gender: res.data.gender,
                    address: res.data.address,
                    dateOfBirth: res.data.dateOfBirth,
                    role: res.data.role,
                };
                setUser(userData);
            } else {
                setUser(undefined);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUrlOauth()
        if (code != null) generateTokenSocial();
        checkUser();
    }, []);

    const login = async (email: string, password: string) => {
        const data = {
            email,
            password,
        };

        try {
            const res = await axiosInstance.post(`${apiUrl}/auth/login`, data);
            if (res.data.token != null) {
                toast.success(res.data.message);
                localStorage.setItem("token", res.data.token);
                await checkUser();
                return true;
            } else toast.error(res.data.message);
        } catch (error) {
            console.log(error);
        }
        return false;
    };

    const register = async (name: string, email: string, password: string) => {
        const data = {
            name,
            email,
            password,
        };

        try {
            const res = await axiosInstance.post(`${apiUrl}/auth/register`, data);
            if (res.data.success) {
                toast.success(res.data.message);
                return true;
            } else toast.error(res.data.message);
        } catch (error) {
            console.log(error);
        }
        return false;
    };

    const logout = async () => {
        try {
            localStorage.removeItem("token");
            toast.success("Logout success!")
            // await axiosInstance.get(`${apiUrl}/auth/logout`);
            await checkUser();
        } catch (error) {
            console.log(error);
        }
    };

    return <AuthProvider.Provider
        value={{login, user, checkUser, logout, register, getAllUrlOauth}}>{children}</AuthProvider.Provider>;
}

export default AuthContextProvider;
