import {twMerge} from "tailwind-merge";
import useUpdateUserInfo from "@/hooks/useUpdateUserInfo";
import React, {FormEvent, useEffect, useState} from "react";
import CustomCursor from "@/components/others/CustomCursor";
import {useAuth} from "@/contexts/AuthProvider";
import {DatePicker, DatePickerProps} from "antd";
import {DetailPhone, UserUpdate} from "@/interface";
import {FaCaretDown} from "react-icons/fa6";
import {FaCaretUp} from "react-icons/fa";
import {AiOutlineSearch} from "react-icons/ai";
import {usePhone} from "@/contexts/PhoneProvider";
import {useDebounce} from "@/hooks/useDebounce";
import {convertStringToDate} from "@/helpers/covertStringToDate";
import {z} from "zod";
import dayjs from "dayjs";
import PhoneUser from "@/components/user/PhoneUser";

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
        gender: z
            .string({
                required_error: "Field is required",
            })
            .refine(value => value != "Gender", {
                message: "Field is required",
            }),
        phone: z
            .string({
                required_error: "Field is required",
                invalid_type_error: "Phone must be a number",
            })
            .refine(value => /^\d+$/.test(value.split(" ")[1]), {
                message: "Must only contain number",
            }),
    });

function UpdateUserInfoModal() {
    const updateUserInfo = useUpdateUserInfo()
    const {user, updateInfoUser} = useAuth();
    const {phonesSearch, searchPhone} = usePhone();
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [showGender, setShowGender] = useState(false)
    const [formData, setFormData] = useState<UserUpdate>({
        firstName: user?.firstName || "None",
        lastName: user?.lastName || "None",
        gender: user?.gender || "Gender",
        dateOfBirth: user?.dateOfBirth || null,
        phone: user?.phone || "None",
    })
    const dateValue = formData.dateOfBirth ? formData.dateOfBirth : user?.dateOfBirth

    useEffect(() => {
        setShowGender(false)
        setFormData({
            firstName: user?.firstName || "None",
            lastName: user?.lastName || "None",
            gender: user?.gender || "Gender",
            dateOfBirth: user?.dateOfBirth || null,
            phone: user?.phone || "None",
        })
        setFormErrors({});
        searchPhone("")
    }, [user]);

    useEffect(() => {
        const body = document.querySelector<HTMLElement>("body")
        if (updateUserInfo.isOpen)
            document.querySelector<HTMLElement>("body")!.style.overflowY = "hidden"
        else
            document.querySelector<HTMLElement>("body")!.style.overflowY = "auto"
        setFormData(prev => {
            return {
                ...prev,
                dateOfBirth: convertStringToDate(prev.dateOfBirth?.toString().split(" ")[0] as string)
            }
        })
    }, [updateUserInfo.isOpen])

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        setFormData(prev => {
            return {
                ...prev,
                dateOfBirth: convertStringToDate(dateString as string)
            }
        })
    };

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
            if (formData.dateOfBirth == null)
                newErrors = {
                    ...newErrors,
                    dateOfBirth: "Field is required"
                }
            return setFormErrors(newErrors);
        }
        setFormErrors({});
        try {
            if (user == null) return;

            const isSuccess = await updateInfoUser(user?.id, formData)
            if (isSuccess)
                updateUserInfo.onClose()
        } catch (e) {
            console.log(e)
        }
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.id]: e.target.value,
            }
        })
    }

    const handleChangeGender = (value: string) => {
        setFormData(prev => {
            return {
                ...prev,
                gender: value,
            }
        })
    }

    const handleChangePhone = (value: string) => {
        setFormData(prev => {
            return {
                ...prev,
                phone: value,
            }
        })
    }

    const handleSelectPhone = (index: number) => {
        setFormData(prev => {
            return {
                ...prev,
                phone: phonesSearch ? phonesSearch[index].root + " " + prev.phone.split(" ")[1] : prev.phone,
            }
        })
    }

    return <>
        <div onClick={updateUserInfo.onClose}
             className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] transition-all duration-300 z-[100] cursor-none`, updateUserInfo.isOpen && `block`)}>
            <CustomCursor/>
        </div>
        <div
            className={twMerge(`fixed top-[40%] w-[70vw] min-w-[95%] sm:min-w-[350px] max-w-[600px] md:px-4 lg:px-6 xl:px-8 left-[50%] translate-x-[-50%]
                translate-y-[-50%] bg-white transition-all origin-center scale-[0.001] duration-300 z-[101] px-4 rounded-md`, updateUserInfo.isOpen && `scale-100`)}>
            <h2 className={"font-bold mt-4 mb-6 text-lg"}>Update profile</h2>
            <form onSubmit={handleSubmit}>
                <div className={"flex mb-4 gap-x-5"}>
                    <div className={"w-[50%]"}>
                        <label className="block mb-1 text-sm text-gray-500" htmlFor="firstName">
                            First Name
                        </label>
                        <input onChange={handleChangeInput} id="firstName" type="text"
                               value={formData.firstName}
                               className="px-4 w-full py-2 rounded-[10px] border border-neutral-900 outline-none"/>
                        <p className="text-red-600 mt-1">{formErrors.firstName}</p>
                    </div>
                    <div className={"flex-1"}>
                        <label className="block mb-1 text-sm text-gray-500" htmlFor="lastName">
                            Last Name
                        </label>
                        <input onChange={handleChangeInput} id="lastName" type="text"
                               value={formData.lastName}
                               className="px-4 py-2 w-full rounded-[10px] border border-neutral-900 outline-none"/>
                        <p className="text-red-600 mt-1">{formErrors.lastName}</p>
                    </div>
                </div>
                <div className={"flex gap-x-4 mb-4"}>
                    <div className={"w-[60%]"}>
                        <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                            Email Address
                        </label>
                        <input id="email" required type="text" value={user?.email || ""} disabled
                               className="px-4 py-2 w-full rounded-[10px] border border-neutral-900 outline-none disabled:bg-gray-200"/>
                    </div>
                    <div className={"flex-1 cursor-pointer"} onClick={() => setShowGender(!showGender)}>
                        <label className="block mb-1 text-sm text-gray-500" htmlFor="gender">
                            Gender
                        </label>
                        <div className={"relative"}>
                            <input id="phone" readOnly required type="text" value={formData.gender}
                                   className="pl-4 cursor-pointer select-none border border-neutral-900 py-2 w-full rounded-[10px] outline-none"/>
                            <ul className={twMerge(`absolute bg-white z-10 border border-neutral-900 w-full shadow rounded-md top-full translate-y-1 transition-all duration-300 scale-[0.001] origin-top`, showGender && `scale-100`)}>
                                <li onClick={() => handleChangeGender("Female")}
                                    className={"hover:bg-blue-500 hover:text-white px-2 py-1 cursor-pointer"}>Female
                                </li>
                                <li onClick={() => handleChangeGender("Male")}
                                    className={"hover:bg-blue-500 hover:text-white px-2 py-1 cursor-pointer"}>Male
                                </li>
                                <li onClick={() => handleChangeGender("Other")}
                                    className={"hover:bg-blue-500 hover:text-white px-2 py-1 cursor-pointer"}>Other
                                </li>
                            </ul>
                            <div
                                className="pointer-events-none absolute top-[50%] translate-y-[-50%] right-0 flex items-center pr-2">
                                {!showGender ?
                                    <svg className="fill-current h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20">
                                        <path d="M10 15l-7-7 1.5-1.5L10 12.086l5.5-5.5L17 8z"/>
                                    </svg> :
                                    <svg className="fill-current h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20">
                                        <path d="M10 5l7 7-1.5 1.5L10 7.914 4.5 13.5 3 12z"/>
                                    </svg>}
                            </div>
                            <p className="text-red-600 mt-1 absolute">{formErrors.gender}</p>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col sm:flex-row mb-4 gap-x-4"}>
                    <div className={"w-[45%] cursor-pointer"}>
                        <label className="block mb-1 text-sm text-gray-500" htmlFor="birth">
                            Date Of Birth
                        </label>
                        {dateValue != undefined && <DatePicker
                            defaultValue={dayjs(dateValue.toString().split(" ")[0], 'YYYY-MM-DD')}
                            inputReadOnly
                            className={"px-4 h-[41.6px] select-none w-full leading-3 border rounded-[10px] border-neutral-900 outline-none hover:border-neutral-900"}
                            onChange={onChangeDate}/>}
                        <p className="text-red-600 mt-1">{formErrors.dateOfBirth}</p>
                    </div>
                    <div className={"flex-1 relative mt-2 sm:mt-0 w-[70%]"}>
                        <label className="block mb-1 text-sm text-gray-500" htmlFor="phone">
                            Phone
                        </label>
                        <PhoneUser handleChange={handleChangePhone}
                                   handleSelect={handleSelectPhone}/>
                        <p className="text-red-600 mt-1">{formErrors.phone}</p>
                    </div>
                </div>
                <div className={"flex gap-x-4 items-center pb-4 pt-6 w-full px-8"}>
                    <button type={"button"} className={"border border-[#acacac] font-bold py-3 flex-1"}
                            onClick={updateUserInfo.onClose}>
                        CANCEL
                    </button>
                    <button type={"submit"} className={"bg-black text-white font-bold py-3 flex-1"}>
                        UPDATE
                    </button>
                </div>
            </form>
        </div>

    </>
}

export default UpdateUserInfoModal