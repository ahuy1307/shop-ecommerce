"use client";
import {ChangeEvent, FormEvent, useReducer, useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {BsCheckSquareFill, BsFacebook} from "react-icons/bs";
import {twMerge} from "tailwind-merge";
import {useRouter} from "next/navigation";
import {useAuth} from "@/contexts/AuthProvider";
import {AiOutlineGithub} from "react-icons/ai";
import {z} from "zod";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const formReducer = (state: Record<string, string>, action: {
    type: string;
    fieldName: string;
    fieldValue: string;
}) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.fieldName]: action.fieldValue,
            };
        case 'RESET_FORM':
            return {}; // Reset form data to an empty object
        default:
            return state;
    }
};

const User = z
    .object({
        firstName: z
            .string({
                required_error: "First Name is required",
                invalid_type_error:
                    "First name must be a string with a minimum length of 3 and a maximum length of 20",
            })
            .min(3)
            .max(20),
        lastName: z
            .string({
                required_error: "Last Name is required",
                invalid_type_error:
                    "Lastname must be a string with a minimum length of 3 and a maximum length of 20",
            })
            .min(3)
            .max(20),
        email: z
            .string({
                required_error: "Email is required",
            })
            .email(),
        password: z
            .string({
                required_error: "Password is required",
                invalid_type_error:
                    "Password must be a string with a minimum length of 6 and a maximum length of 20",
            })
            .min(6)
            .max(20)
            .refine(value => /^[A-Z]/.test(value), {
                message: "Password must start with an uppercase letter",
            }),
        confirmPassword: z.string().min(6).max(20),
    })
    .superRefine(({password, confirmPassword}, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Passwords do not match",
            });
        }
    });

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex gap-x-4 items-center w-full justify-center h-screen px-4 md:px-6 text-sm">
            <div className="w-full h-screen overflow-hidden hidden md:block py-[80px]">
                <img src={isLogin ? `./images/login_img.png` : `./images/register_img.png`}
                     className="w-full object-contain h-full" alt=""/>
            </div>
            <div className="md:w-full sm:w-[500px] w-full">
                <h2 className="text-neutral-900 text-3xl font-bold mb-2">{isLogin ? `Welcome👋` : `Create New Account`}</h2>
                <h2 className="text-zinc-400 text-base font-normal mb-4">{isLogin ? `Please login here` : `Please enter detailst`}</h2>
                {isLogin ? <LoginForm onClick={() => setIsLogin(false)}/> :
                    <RegisterForm onClick={() => setIsLogin(true)}/>}
            </div>
        </div>
    );
}

export default AuthForm;
