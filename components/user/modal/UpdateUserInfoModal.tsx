import {twMerge} from "tailwind-merge";
import useUpdateUserInfo from "@/hooks/useUpdateUserInfo";
import React, {useEffect, useState} from "react";
import CustomCursor from "@/components/others/CustomCursor";
import {useAuth} from "@/contexts/AuthProvider";
import {DatePicker, DatePickerProps} from "antd";
import {DetailPhone} from "@/interface";
import {FaCaretDown} from "react-icons/fa6";
import {FaCaretUp} from "react-icons/fa";
import {AiOutlineClose, AiOutlineSearch} from "react-icons/ai";
import {usePhone} from "@/contexts/PhoneProvider";
import {useDebounce} from "@/hooks/useDebounce";

function UpdateUserInfoModal() {
    const updateUserInfo = useUpdateUserInfo()
    const {user} = useAuth();
    const {phonesSearch, searchPhone} = usePhone();
    const [showPhones, setShowPhones] = useState(false)
    const [phoneSelected, setPhoneSelected] = useState<DetailPhone | null>(phonesSearch ? phonesSearch[0] : null)
    const [phoneSearch, setPhoneSearch] = useState("")
    const debounceSearch = useDebounce(phoneSearch, 100);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        gender: user?.gender || "",
        dateOfBirth: user?.dateOfBirth || null,
        phone: user?.phone || "",
    })

    useEffect(() => {
        const fetchSearch = async () => {
            if (debounceSearch === "") {
                searchPhone(debounceSearch)
                return;
            }

            searchPhone(debounceSearch)
        };

        fetchSearch();
    }, [debounceSearch]);

    useEffect(() => {
        if (phonesSearch) setPhoneSelected(phonesSearch[0])
    }, [updateUserInfo.isOpen]);

    useEffect(() => {
        const body = document.querySelector<HTMLElement>("body")
        if (updateUserInfo.isOpen)
            document.querySelector<HTMLElement>("body")!.style.overflowY = "hidden"
        else
            document.querySelector<HTMLElement>("body")!.style.overflowY = "auto"

    }, [updateUserInfo.isOpen])

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const handleSelectPhone = (index: number) => {
        setShowPhones(false)
        setPhoneSearch("")
        if (phonesSearch) {
            setPhoneSelected(phonesSearch[index])
        }
    }

    const handleOpenPhone = () => {
        setShowPhones(prev => {
            const check = !prev
            if (check)
                document.getElementById(`phone-${phonesSearch?.indexOf(phoneSelected as DetailPhone)}`)?.scrollIntoView()
            return !prev
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
            <div className={"flex mb-4"}>
                <div className={"w-[50%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="firstName">
                        First Name
                    </label>
                    <input id="firstName" required type="text" value={user?.firstName || ""}
                           className="px-4 py-3 rounded-[10px] border border-neutral-900 outline-none"/>
                </div>
                <div className={"flex-1"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="lastName">
                        Last Name
                    </label>
                    <input id="lastName" required type="text" value={user?.lastName || ""}
                           className="px-4 py-3 w-full rounded-[10px] border border-neutral-900 outline-none"/>
                </div>
            </div>
            <div className={"flex gap-x-4 mb-4"}>
                <div className={"w-[70%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Email Address
                    </label>
                    <input id="email" required type="text" value={user?.email || ""} disabled
                           className="px-4 py-3 w-full rounded-[10px] border border-neutral-900 outline-none disabled:bg-gray-200"/>
                </div>
                <div className={"flex-1"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="gender">
                        Gender
                    </label>
                    <div className={"relative"}>
                        <select
                            className="appearance-none block border outline-none border-neutral-900 w-full py-3 px-4 bg-white rounded-lg pr-4 shadow-sm">
                            <option disabled selected className={"hidden"}>Gender</option>
                            <option value={"female"}>Female</option>
                            <option value={"male"}>Male</option>
                            <option value={"other"}>Other</option>
                        </select>
                        <div
                            className="pointer-events-none absolute top-[50%] translate-y-[-50%] right-0 flex items-center pr-2">
                            <svg className="fill-current h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M10 15l-7-7 1.5-1.5L10 12.086l5.5-5.5L17 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex mb-4 gap-x-4"}>
                <div className={"w-[45%] cursor-pointer"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="birth">
                        Date Of Birth
                    </label>
                    <DatePicker
                        className={"px-4 h-[49.6px] w-full leading-3 border rounded-[10px] border-neutral-900 outline-none hover:border-neutral-900"}
                        onChange={onChange}/>
                </div>
                <div className={"flex-1 relative "}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="phone">
                        Phone
                    </label>
                    <div
                        className={"flex border items-center gap-x-2 rounded-lg border-neutral-900 cursor-pointer"}>
                        <div
                            onClick={handleOpenPhone}
                            className={"flex items-center pr-2 gap-x-3 pl-2 h-[49.6px] select-none border-r-2 border-neutral-500"}>
                            <div
                                className={"flex items-center gap-x-1 h-full cursor-pointer"}>
                                <img src={phoneSelected?.flag} className={"w-14 h-5 object-contain"} alt=""/>
                            </div>
                            {showPhones ? <FaCaretUp className={"w-5 h-5"}/> : <FaCaretDown className={"w-5 h-5"}/>}
                        </div>
                        <div
                            className={twMerge(` absolute w-[120%] right-0 top-full translate-y-2 bg-white 
                            border border-neutral-500 shadow-2xl rounded-md transition-all duration-300 origin-top scale-[0.001]`, showPhones && `scale-100`)}>
                            <div className={"flex items-center gap-x-2 px-2"}>
                                <AiOutlineSearch className={"w-7 h-7"} strokeWidth={3}/>
                                <input type="text" placeholder={"Search for country..."}
                                       value={phoneSearch}
                                       className={"w-full border-none outline-none px-2 py-3"}
                                       onChange={(e) => setPhoneSearch(e.target.value)}/>
                            </div>
                            <div className={"max-h-44 overflow-y-scroll"}>
                                {phonesSearch && phonesSearch.map((phone, index) => {
                                    return <div
                                        key={index}
                                        onClick={() => handleSelectPhone(index)}
                                        id={`phone-${index}`}
                                        className={twMerge(`flex items-center px-2 gap-x-3 py-3 
                                    border-neutral-400 border-t hover:bg-gray-500/20 cursor-pointer`, phonesSearch?.indexOf(phoneSelected as DetailPhone) == index && `bg-gray-500/20`)}>
                                        <img src={phone?.flag} className={"w-8 h-5 object-contain"} alt=""/>
                                        <p className={"text-sm line-clamp-1"}>{phone.country}</p>
                                        <p className={"text-sm"}>({phone.root})</p>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className={"flex items-center gap-x-3"}>
                            <p className={"opacity-60 text-sm"}>{phoneSelected?.root}</p>
                            <input id="phone" required type="text" value="905369675"
                                   className="pr-4 border-none py-3 w-full rounded-[10px] outline-none"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex gap-x-4 items-center pb-4 pt-6 w-full px-8"}>
                <button className={"border border-[#acacac] font-bold py-3 flex-1"}
                        onClick={updateUserInfo.onClose}>
                    CANCEL
                </button>
                <button className={"bg-black text-white font-bold py-3 flex-1"}>
                    UPDATE
                </button>
            </div>
        </div>

    </>
}

export default UpdateUserInfoModal