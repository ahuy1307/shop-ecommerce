import useUpdateUserInfo from "@/hooks/useUpdateUserInfo";
import {useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";
import useCreateUserAddress from "@/hooks/useCreateUserAddress";
import {BsCheckSquareFill} from "react-icons/bs";
import CustomCursor from "@/components/others/CustomCursor";

function AddAdressInfoModal() {
    const createUserAddress = useCreateUserAddress()
    const [checkDefault, setCheckDefault] = useState(false)
    useEffect(() => {
        const body = document.querySelector<HTMLElement>("body")
        if (createUserAddress.isOpen)
            document.querySelector<HTMLElement>("body")!.style.overflowY = "hidden"
        else
            document.querySelector<HTMLElement>("body")!.style.overflowY = "auto"

    }, [createUserAddress.isOpen])

    return <>
        <div onClick={createUserAddress.onClose}
             className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] transition-all duration-500 z-[100] cursor-none`, createUserAddress.isOpen && `block`)}>
            <CustomCursor/>
        </div>
        <div
            className={twMerge(`fixed top-[50%] w-[70vw] min-w-[95%] sm:min-w-[350px] max-w-[450px] left-[50%] translate-x-[-50%]
                translate-y-[-50%] bg-white transition-all origin-center hidden z-[101] px-4`, createUserAddress.isOpen && `block`)}>
            <h2 className={"font-bold mt-4 mb-6 text-lg"}>Add a new address</h2>
            <div className={""}>
                <input id={"test"} type={'text'}/>
                <label className="block mb-1 text-sm" htmlFor="name">
                    Name
                </label>
                <input id="name" required name={"name"} type="text" placeholder="Enter Name"
                       className="px-4 py-3 w-full rounded-[10px] border border-neutral-900 outline-none"/>
            </div>
            <div className={"mt-4"}>
                <label className="block mb-1 text-sm" htmlFor="email">
                    Mobile Number
                </label>
                <input id="email" required type="text" placeholder="Enter Mobile Number"
                       className="px-4 py-3 w-full rounded-[10px] border border-neutral-900 outline-none"/>
            </div>
            <div className="w-full mt-4">
                <label className="block mb-1 text-sm">
                    City
                </label>
                <div className={"relative"}>
                    <select
                        className="appearance-none block border outline-none border-neutral-900 w-full py-3 px-4 bg-white rounded-lg pr-4 shadow-sm">
                        <option>Select City</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                        <option>Option 4</option>
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
            <div className="w-full mt-4">
                <label className="block mb-1 text-sm">
                    State
                </label>
                <div className={"relative"}>
                    <select
                        className="appearance-none block border outline-none border-neutral-900 w-full py-3 px-4 bg-white rounded-lg pr-4 shadow-sm">
                        <option>Select State</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                        <option>Option 4</option>
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
            <div className={"mt-4"}>
                <label className="block mb-1 text-sm" htmlFor="email">
                    Current Address
                </label>
                <input id="email" required type="text" placeholder="Enter Current Address"
                       className="px-4 py-3 w-full rounded-[10px] border border-neutral-900 outline-none"/>
            </div>
            <div className={"flex items-center gap-x-3 relative my-4"}>
                <input type="checkbox" required={true}
                       className={twMerge(`w-[18px] h-[18px]`, !checkDefault ? `visible` : `invisible`)}
                       id={"term"}
                       checked={checkDefault}
                       onChange={e => setCheckDefault(e.currentTarget.checked)}/>

                <label htmlFor={"term"} onClick={() => setCheckDefault(!checkDefault)}>Use as my default address</label>
                {checkDefault && <div className={"absolute top-[50%] translate-y-[-50%] left-0"}
                                      onClick={() => setCheckDefault(false)}>
                    <BsCheckSquareFill className={"w-[18px] h-[18px]"}/>
                </div>}
            </div>
            <div className={"flex gap-x-4 items-center pb-4 pt-6 w-full px-4"}>
                <button className={"border border-[#acacac] font-bold py-3 flex-1"}
                        onClick={createUserAddress.onClose}>
                    CANCEL
                </button>
                <button className={"bg-black text-white font-bold py-3 flex-1"}>
                    ADD NEW ADDRESS
                </button>
            </div>
        </div>

    </>
}


export default AddAdressInfoModal