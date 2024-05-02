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
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
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
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const token = searchParams.get("token");


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
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
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
        if (error != null) toast.error(error);
        if (token != null && token.startsWith("eyJ")) {
            localStorage.setItem("token", token)
            toast.success("Verify success!")
        }
        checkUser();
    }, []);

    const login = async (email: string, password: string) => {
        const data = {
            email,
            password,
        };

        try {
            setIsLoading(true)
            const res = await axiosInstance.post(`${apiUrl}/auth/login`, data);
            if (res.data.token != null) {
                toast.success(res.data.message);
                localStorage.setItem("token", res.data.token);
                await checkUser();
                setIsLoading(false)
                return true
            } else toast.error(res.data.message);
            ``
            setIsLoading(false)
            return false
        } catch (error) {
            console.log(error);
        }
        return false;
    };

    const register = async (firstName: string, lastName: string, email: string, password: string) => {
        const data = {
            firstName,
            lastName,
            email,
            password,
        };

        try {
            setIsLoading(true)
            const res = await axiosInstance.post(`${apiUrl}/auth/register`, data);
            if (res.data.success) {
                toast.success(res.data.message);
                setIsLoading(false);
                return res.data.success
            } else toast.error(res.data.message);
            setIsLoading(false);
            return false;
        } catch (error) {
            console.log(error);
        }
        return false;
    };

    const logout = async () => {
        try {
            localStorage.removeItem("token");
            toast.success("Logout success!")
            await checkUser();
        } catch (error) {
            console.log(error);
        }
    };

    return <AuthProvider.Provider
        value={{
            login,
            user,
            checkUser,
            logout,
            register,
            getAllUrlOauth,
            isLoading
        }}>{children}</AuthProvider.Provider>;
}

export default AuthContextProvider;
