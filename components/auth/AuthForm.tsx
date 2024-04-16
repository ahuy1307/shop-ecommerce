"use client";
import {ChangeEvent, FormEvent, useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {BsCheckSquareFill, BsFacebook} from "react-icons/bs";
import {twMerge} from "tailwind-merge";
import {useRouter} from "next/navigation";
import {useAuth} from "@/contexts/AuthProvider";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [checkTerm, setCheckTerm] = useState(false)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const router = useRouter()
    const {login, register} = useAuth();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            if (isLogin) {
                const isSuccess = await login(data.email, data.password);
                if (isSuccess) {
                    setData((prevs) => {
                        return {
                            ...prevs,
                            email: "",
                            password: "",
                        };
                    });
                    router.push("/")
                }
            } else {

                const isSuccess = await register(`${data.firstName} ${data.lastName}`, data.email, data.password);

                if (isSuccess) {
                    setData((prevs) => {
                        return {
                            ...prevs,
                            firstName: "",
                            lastName: ""
                        };
                    });
                    setIsLogin(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoginSocialMedia = (url: string | null) => {
        if (url == null) return;

        if (url.substring(8).startsWith("github")) localStorage.setItem("type", "github");
        else localStorage.setItem("type", "google");
        router.push(url);
    };

    const handleChange = () => {
        setIsLogin(!isLogin);
        setData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        });
    };

    return (
        <div className="flex gap-x-4 items-center w-full justify-center h-screen px-4 md:px-6 text-sm">
            <div className="w-full h-screen overflow-hidden hidden md:block py-[80px]">
                <img src={isLogin ? `./images/login_img.png` : `./images/register_img.png`}
                     className="w-full object-contain h-full" alt=""/>
            </div>
            <div className="md:w-full sm:w-[500px] w-full">
                <h2 className="text-neutral-900 text-3xl font-bold mb-2">{isLogin ? `Welcome👋` : `Create New Account`}</h2>
                <h2 className="text-zinc-400 text-base font-normal mb-4">{isLogin ? `Please login here` : `Please enter detailst`}</h2>
                <form className="flex-row gap-x-4 xl:w-[550px]" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="flex items-center gap-x-4">
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input onChange={handleOnChange}
                                       name="firstName"
                                       value={data.firstName}
                                       id="firstName" required type="text"
                                       placeholder="Robert"
                                       className="h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none border border-neutral-900"/>
                            </div>
                            <div className="mb-4 flex-1">
                                <label className="block mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input id="lastName"
                                       onChange={handleOnChange}
                                       name="lastName"
                                       value={data.lastName}
                                       required type="text" placeholder="Fox"
                                       className="h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none w-full border border-neutral-900"/>
                            </div>
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input id="email"
                               name="email"
                               onChange={handleOnChange}
                               value={data.email}
                               required type="text" placeholder="example@gmail.com"
                               className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none border border-neutral-900"/>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="password">
                            Password
                        </label>
                        <input id="password"
                               name="password"
                               onChange={handleOnChange}
                               value={data.password}
                               required type="password" placeholder="*****************"
                               className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none border border-neutral-900"/>
                    </div>
                    {!isLogin && <div className={"flex items-center gap-x-3 mb-4 relative"}>
                        <input type="checkbox" required={true}
                               className={twMerge(`w-[18px] h-[18px]`, !checkTerm ? `visible` : `invisible`)}
                               id={"term"}
                               checked={checkTerm}
                               onChange={e => setCheckTerm(e.currentTarget.checked)}/>

                        <label htmlFor={"term"}>I agree to the <strong>Terms & Conditions</strong></label>
                        {checkTerm && <div className={"absolute top-[50%] translate-y-[-50%] left-0"}
                                           onClick={() => setCheckTerm(false)}>
                            <BsCheckSquareFill className={"w-[18px] h-[18px]"}/>
                        </div>}
                    </div>}
                    {isLogin && <p className="float-right underline cursor-pointer mb-4">Forgot Password?</p>}
                    <button type="submit" className="bg-black text-white w-full rounded-[10px] py-5 mb-4">
                        {isLogin ? `Sign In` : `Sing Up`}
                    </button>
                </form>
                {isLogin && <div className={"xl:w-[550px]"}>
                    <p className={"text-center"}>Or login with</p>
                    <div className={"flex items-center justify-center gap-x-4 my-4 cursor-pointer"}>
                        <BsFacebook className={"w-10 h-10 text-[#1197f0]"}
                                    onClick={() => handleLoginSocialMedia(localStorage.getItem("urlGithub"))}/>
                        <FcGoogle className={"w-10 h-10"}
                                  onClick={() => handleLoginSocialMedia(localStorage.getItem("urlGoogle"))}/>
                    </div>
                </div>}
                <div className="flex justify-center gap-x-2 xl:w-[550px]">
                    <p>{isLogin ? `You don't have account?` : `You already have account?`} </p>
                    <p onClick={handleChange} className="font-bold cursor-pointer">
                        {!isLogin ? `Sign In` : `Sing Up`}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
