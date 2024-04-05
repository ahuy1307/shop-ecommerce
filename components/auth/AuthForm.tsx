"use client";
import {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {BsFacebook} from "react-icons/bs";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex gap-x-4 items-center w-full justify-center h-screen px-4 md:px-6 text-sm">
            <div className="w-full h-screen overflow-hidden hidden md:block py-[80px]">
                <img src={isLogin ? `./images/login_img.png` : `./images/register_img.png`}
                     className="w-full object-contain h-full" alt=""/>
            </div>
            <form className="md:w-full sm:w-[500px] w-full">
                <h2 className="text-neutral-900 text-3xl font-bold mb-2">{isLogin ? `Welcome👋` : `Create New Account`}</h2>
                <h2 className="text-zinc-400 text-base font-normal mb-4">{isLogin ? `Please login here` : `Please enter detailst`}</h2>
                <div className="flex-row gap-x-4 xl:w-[550px]">
                    {!isLogin && (
                        <div className="flex items-center gap-x-4">
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input id="firstName" required type="text" placeholder="Robert"
                                       className="h-14 px-4 pt-4 pb-[17px] rounded-[10px] border border-neutral-900"/>
                            </div>
                            <div className="mb-4 flex-1">
                                <label className="block mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input id="lastName" required type="text" placeholder="Fox"
                                       className="h-14 px-4 pt-4 pb-[17px] rounded-[10px] w-full border border-neutral-900"/>
                            </div>
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input id="email" required type="text" placeholder="example@gmail.com"
                               className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] border border-neutral-900"/>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="password">
                            Pasword
                        </label>
                        <input id="password" required type="text" placeholder="*****************"
                               className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] border border-neutral-900"/>
                    </div>
                    {isLogin && <p className="float-right underline cursor-pointer mb-4">Forgot Password?</p>}
                    <button type="submit" className="bg-black text-white w-full rounded-[10px] py-5 mb-4">
                        {isLogin ? `Sign In` : `Sing Up`}
                    </button>
                </div>
                {isLogin && <div className={"xl:w-[550px]"}>
                    <p className={"text-center"}>Or login with</p>
                    <div className={"flex items-center justify-center gap-x-4 my-4"}>
                        <BsFacebook className={"w-10 h-10 text-[#1197f0]"}/>
                        <FcGoogle className={"w-10 h-10"}/>
                    </div>
                </div>}
                <div className="flex justify-center gap-x-2 xl:w-[550px]">
                    <p>{isLogin ? `You don't have account?` : `You already have account?`} </p>
                    <p onClick={() => setIsLogin(!isLogin)} className="font-bold cursor-pointer">
                        {!isLogin ? `Sign In` : `Sing Up`}
                    </p>
                </div>
            </form>
        </div>
    );
}

export default AuthForm;
