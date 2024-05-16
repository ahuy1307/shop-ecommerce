import {twMerge} from "tailwind-merge";
import CustomCursor from "@/components/others/CustomCursor";
import {PiWarningFill} from "react-icons/pi";
import {useEffect} from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

function DeleteAddressModal({isOpen = true, onClose, onDelete}: Props) {
    useEffect(() => {
        const body = document.querySelector<HTMLElement>("body")
        if (isOpen)
            document.querySelector<HTMLElement>("body")!.style.overflowY = "hidden"
        else
            document.querySelector<HTMLElement>("body")!.style.overflowY = "auto"

    }, [isOpen])

    return <>
        <div onClick={onClose}
             className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] transition-all duration-500 z-[100]`, isOpen && `block`)}>
        </div>
        <div className={twMerge(`fixed top-[50%] w-[70vw] min-w-[95%] sm:min-w-[350px] max-w-[450px] left-[50%] translate-x-[-50%]
                translate-y-[-50%] bg-white transition-all rounded-xl duration-300 origin-center scale-[0.001] z-[101] px-4`, isOpen && `scale-100`)}>
            <div className={"flex flex-col items-center"}>
                <div className={"bg-red-100 p-3 inline-flex rounded-full mt-6"}>
                    <PiWarningFill className={"text-red-500 flex justify-center items-center w-7 h-7"}/>
                </div>
                <h2 className={"text-blue-950 font-bold text-xl mt-6"}>Delete Address</h2>
                <p className={"text-blue-950 mt-4"}>You're going to delete address. Are you sure ?</p>
                <div className={"flex items-center justify-between my-6 gap-x-4"}>
                    <p onClick={onClose}
                       className={"bg-gray-300/40 py-3 px-6 rounded-full text-blue-950 font-bold cursor-pointer hover:opacity-70"}>No,
                        Keep it.</p>
                    <p onClick={onDelete}
                       className={"bg-[#ff3f56] py-3 px-6 rounded-full text-white font-bold cursor-pointer hover:opacity-70"}>Yes,
                        Delete!</p>
                </div>
            </div>
        </div>
    </>

}

export default DeleteAddressModal