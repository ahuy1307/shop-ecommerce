import {twMerge} from "tailwind-merge";
import {BsCheckSquareFill} from "react-icons/bs";
import {AiOutlineGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {FormEvent, FormEventHandler, useReducer, useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";

const formReducer = (state: Record<string, string>, event: React.ChangeEvent<HTMLInputElement>) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};
const User = z
    .object({
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
            .min(6, {
                message: "Must contain at least 6 characters"
            })
            .max(20, {
                message: "Must contain at most 20 characters",
            })
            .refine(value => /^[A-Z]/.test(value), {
                message: "Password must start with an uppercase letter",
            }),
    });

function LoginForm({onClick}: { onClick: () => void }) {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const router = useRouter()

    const handleLoginSocialMedia = (url: string | null) => {
        if (url == null) return;

        if (url.substring(8).startsWith("github")) localStorage.setItem("type", "github");
        else localStorage.setItem("type", "google");
        router.push(url);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const parsedUser = User.safeParse(formData);
        if (!parsedUser.success) {
            const error = parsedUser.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);
        }
        setFormErrors({});
    }

    return <>
        <form className="flex-row gap-x-4 xl:w-[550px]" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="email">
                    Email Address
                </label>
                <input id="email"
                       name="email"
                       onChange={setFormData}
                       type="text" placeholder="example@gmail.com"
                       className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none border border-neutral-900"/>
                {formErrors.email && <p className="text-red-600 mt-1">{formErrors.email}</p>}
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="password">
                    Password
                </label>
                <input id="password"
                       name="password"
                       onChange={setFormData}
                       type="password" placeholder="*****************"
                       className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none border border-neutral-900"/>
                {formErrors.password && <p className="text-red-600 mt-1">{formErrors.password}</p>}
            </div>
            <p className="float-right underline cursor-pointer mb-4">Forgot Password?</p>
            <button type="submit" className="bg-black text-white w-full rounded-[10px] py-5 mb-4">
                Sign In
            </button>
        </form>
        <div className={"xl:w-[550px]"}>
            <p className={"text-center"}>Or login with</p>
            <div className={"flex items-center justify-center gap-x-4 my-4 cursor-pointer"}>
                <AiOutlineGithub className={"w-10 h-10"}
                                 onClick={() => handleLoginSocialMedia(localStorage.getItem("urlGithub"))}/>
                <FcGoogle className={"w-10 h-10"}
                          onClick={() => handleLoginSocialMedia(localStorage.getItem("urlGoogle"))}/>
            </div>
        </div>

        <div className="flex justify-center gap-x-2 xl:w-[550px]">
            <p>`You don't have account?` </p>
            <p onClick={onClick} className="font-bold cursor-pointer">
                Sing Up
            </p>
        </div>
    </>
}

export default LoginForm