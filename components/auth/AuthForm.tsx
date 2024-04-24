"use client";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import useLocalStorage from "@/hooks/useLocalStorage";
import {useEffect, useState} from "react";


function AuthForm() {
    const isBrowser = () => typeof window !== 'undefined';
    const [isLogin, setIsLogin] = useState<boolean>(true);

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <div className="flex gap-x-4 items-center w-full justify-center h-screen px-4 md:px-6 text-sm">
            <div className="w-full h-screen overflow-hidden hidden md:block py-[80px]">
                <img src={isLogin ? `./images/login_img.png` : `./images/register_img.png`}
                     className="w-full object-contain h-full" alt=""/>
            </div>
            <div className="md:w-full sm:w-[500px] w-full">
                <h2 className="text-neutral-900 text-3xl font-bold mb-2">{isLogin ? `Welcome👋` : `Create New Account`}</h2>
                <h2 className="text-zinc-400 text-base font-normal mb-4">{isLogin ? `Please login here` : `Please enter detailst`}</h2>
                {isLogin ? <LoginForm onClick={() => {
                        setIsLogin(false)
                        scrollToTop()
                    }}/> :
                    <RegisterForm onClick={() => {
                        scrollToTop()
                        setIsLogin(true)
                    }}/>}
            </div>
        </div>
    );
}

export default AuthForm;
