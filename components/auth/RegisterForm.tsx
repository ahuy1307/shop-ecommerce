import {twMerge} from "tailwind-merge";
import {BsCheckSquareFill} from "react-icons/bs";
import {FormEvent, useReducer, useRef, useState} from "react";
import {z} from "zod";
import {useAuth} from "@/contexts/AuthProvider";
import {ClipLoader} from "react-spinners";
import EmailVerifyModal from "@/components/auth/EmailVerifyModal";
import useEmailVerifyModal from "@/hooks/useEmailVerifyModal";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const formReducer = (state: Record<string, string>, event: React.ChangeEvent<HTMLInputElement>) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const User = z
    .object({
        firstName: z
            .string({
                required_error: "Field is required",
                invalid_type_error:
                    "First name must be a string with a minimum length of 3 and a maximum length of 20",
            })
            .min(3, {
                message: "Must contain at least 3 characters",
            })
            .max(20, {
                message: "Must contain at most 20 characters",
            })
            .refine(value => /^[A-Za-z ]+$/.test(value), {
                message: "Must only contain letters",
            }),
        lastName: z
            .string({
                required_error: "Field is required",
                invalid_type_error:
                    "Lastname must be a string with a minimum length of 3 and a maximum length of 20",
            })
            .min(3, {
                message: "Must contain at least 3 characters"
            })
            .max(20, {
                message: "Must contain at most 20 characters",
            })
            .refine(value => /^[A-Za-z ]+$/.test(value), {
                message: "Must only contain letters",
            }),
        email: z
            .string({
                required_error: "Field is required",
            })
            .email(),
        password: z
            .string({
                required_error: "Field is required",
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
        confirmPassword: z.string({
            required_error: "Field is required",
            invalid_type_error:
                "Password must be a string with a minimum length of 6 and a maximum length of 20",
        })
            .min(6, {
                message: "Must contain at least 6 characters"
            })
            .max(20, {
                message: "Must contain at most 20 characters",
            })
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

function RegisterForm({onClick}: { onClick: () => void }) {
    const [checkTerm, setCheckTerm] = useState(false)
    const [formData, setFormData] = useReducer(formReducer, {});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const {register, isLoading} = useAuth();
    const emailVerify = useEmailVerifyModal();
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const IconPassword = !showPassword.password ? FaEyeSlash : FaEye;
    const IconConfirmPassword = !showPassword.confirmPassword ? FaEyeSlash : FaEye;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        try {
            const isSuccess = await register(formData.firstName, formData.lastName, formData.email, formData.password);
            if (isSuccess) {
                emailVerify.onOpen();
            }
        } catch (e) {
            console.log(e)
        }
    }

    return <>
        <form className="flex-row gap-x-4 xl:w-[550px]" onSubmit={handleSubmit}>
            <div className="flex items-center gap-x-4">
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input onChange={setFormData}
                           type="text"
                           name="firstName"
                           placeholder="Robert"
                           disabled={isLoading}
                           className="h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none border border-neutral-900 disabled:bg-gray-500/10"/>
                    {formErrors.firstName && <p className="text-red-600 mt-1">{formErrors.firstName}</p>}
                </div>
                <div className="mb-4 flex-1">
                    <label className="block mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        name="lastName"
                        onChange={setFormData}
                        disabled={isLoading}
                        type="text" placeholder="Fox"
                        className="h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none w-full border border-neutral-900 disabled:bg-gray-500/10"/>
                    {formErrors.lastName && <p className="text-red-600 mt-1">{formErrors.lastName}</p>}
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="email">
                    Email Address
                </label>
                <input id="email"
                       onChange={setFormData}
                       name="email"
                       disabled={isLoading}
                       type="text" placeholder="example@gmail.com"
                       className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none border border-neutral-900 disabled:bg-gray-500/10"/>
                {formErrors.email && <p className="text-red-600 mt-1">{formErrors.email}</p>}
            </div>
            <div className="mb-4 relative">
                <label className="block mb-2" htmlFor="password">
                    Password
                </label>
                <IconPassword onClick={() => setShowPassword(prevState => {
                    return {
                        ...prevState,
                        password: !prevState.password
                    }
                })} className={"absolute top-[50%] translate-y-[25%] w-5 h-5 right-4"}/>
                <input id="password"
                       name="password"
                       onChange={setFormData}
                       disabled={isLoading}
                       type={showPassword.password ? "text" : "password"} placeholder="*****************"
                       className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none border border-neutral-900 disabled:bg-gray-500/10"/>
                {formErrors.password && <p className="text-red-600 mt-1">{formErrors.password}</p>}
            </div>
            <div className="mb-4 relative">
                <label className="block mb-2" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <IconConfirmPassword onClick={() => setShowPassword(prevState => {
                    return {
                        ...prevState,
                        confirmPassword: !prevState.confirmPassword
                    }
                })} className={"absolute top-[50%] translate-y-[25%] w-5 h-5 right-4"}/>
                <input id="confirmPassword"
                       name="confirmPassword"
                       onChange={setFormData}
                       disabled={isLoading}
                       type={showPassword.confirmPassword ? "text" : "password"} placeholder="*****************"
                       className="w-full h-14 px-4 pt-4 pb-[17px] rounded-[10px] outline-none border border-neutral-900 disabled:bg-gray-500/10"/>
                {formErrors.confirmPassword &&
                    <p className="text-red-600 mt-1">{formErrors.confirmPassword}</p>}
            </div>
            <div className={"flex items-center gap-x-3 mb-4 relative"}>
                <input type="checkbox"
                       className={twMerge(`w-[18px] h-[18px]`, !checkTerm ? `visible` : `invisible`)}
                       id={"term"}
                       required
                       checked={checkTerm}
                       onChange={e => setCheckTerm(e.currentTarget.checked)}/>

                <label htmlFor={"term"}>I agree to the <strong>Terms & Conditions</strong></label>
                {checkTerm && <div className={"absolute top-[50%] translate-y-[-50%] left-0"}
                                   onClick={() => setCheckTerm(false)}>
                    <BsCheckSquareFill className={"w-[18px] h-[18px]"}/>
                </div>}
            </div>
            <button type="submit" className="bg-black text-white w-full rounded-[10px] py-5 mb-4 disabled:opacity-60"
                    disabled={isLoading}>
                {!isLoading && <p>Sign Up</p>}
                <ClipLoader color={"white"} loading={isLoading} size={20}/>
            </button>
        </form>

        <div className="flex justify-center gap-x-2 xl:w-[550px]">
            <p>You already have account?</p>
            <p onClick={onClick} className="font-bold cursor-pointer">
                Sign In
            </p>
        </div>

        <EmailVerifyModal email={formData.email}/>
    </>
}

export default RegisterForm