import {twMerge} from "tailwind-merge";
import useUpdateUserInfo from "@/hooks/useUpdateUserInfo";
import {useEffect} from "react";
import CustomCursor from "@/components/others/CustomCursor";
import {useAuth} from "@/contexts/AuthProvider";
import {DatePicker, DatePickerProps} from "antd";

function UpdateUserInfoModal() {
    const updateUserInfo = useUpdateUserInfo()
    const {user} = useAuth();

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

    return <>
        <div onClick={updateUserInfo.onClose}
             className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] transition-all duration-500 z-[100] cursor-none`, updateUserInfo.isOpen && `block`)}>
            <CustomCursor/>
        </div>
        <div
            className={twMerge(`fixed top-[50%] w-[70vw] min-w-[95%] sm:min-w-[350px] max-w-[600px] md:px-4 lg:px-6 xl:px-8 left-[50%] translate-x-[-50%]
                translate-y-[-50%] bg-white transition-all origin-center hidden z-[101] px-4`, updateUserInfo.isOpen && `block`)}>
            <h2 className={"font-bold mt-4 mb-6 text-lg"}>Update profile</h2>
            <div className={"flex mb-4"}>
                <div className={"w-[50%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="firstName">
                        First Name
                    </label>
                    <input id="firstName" required type="text" value={user?.firstName || ""}
                           className="px-4 py-2 rounded-[10px] border border-neutral-900 outline-none"/>
                </div>
                <div className={"flex-1"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="lastName">
                        Last Name
                    </label>
                    <input id="lastName" required type="text" value={user?.lastName || ""}
                           className="px-4 py-2 w-full rounded-[10px] border border-neutral-900 outline-none"/>
                </div>
            </div>
            <div className={"flex gap-x-4 mb-4"}>
                <div className={"w-[70%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Email Address
                    </label>
                    <input id="email" required type="text" value={user?.email || ""} disabled
                           className="px-4 py-2 w-full rounded-[10px] border border-neutral-900 outline-none disabled:bg-gray-200"/>
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
                <div className={"w-[50%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="birth">
                        Date Of Birth
                    </label>
                    <DatePicker
                        className={"px-4 h-[41.6px] w-full leading-3 border rounded-[10px] border-neutral-900 outline-none hover:border-neutral-900"}
                        onChange={onChange}/>
                </div>
                <div className={"flex-1"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="phone">
                        Phone
                    </label>
                    <input id="phone" required type="text" value="(+84) 905369675"
                           className="px-4 py-2 w-full rounded-[10px] border border-neutral-900 outline-none"/>
                </div>
            </div>
            <label className="block mb-1 text-sm text-gray-500" htmlFor="address">
                Address
            </label>
            <input id="address" required type="text" value={user?.address || "None"}
                   className="px-4 py-2 w-full rounded-[10px] border border-neutral-900 outline-none"/>
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