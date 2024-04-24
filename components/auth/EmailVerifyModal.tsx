"use client"
import {twMerge} from "tailwind-merge";
import CustomCursor from "@/components/others/CustomCursor";
import useEmailVerifyModal from "@/hooks/useEmailVerifyModal";
import {useEffect} from "react";
import {MdEmail} from "react-icons/md";
import {AiFillCloseCircle} from "react-icons/ai";

function EmailVerifyModal({email}: { email: string }) {
    const emailVerify = useEmailVerifyModal();

    useEffect(() => {
        const body = document.querySelector<HTMLElement>("body")
        if (emailVerify.isOpen)
            document.querySelector<HTMLElement>("body")!.style.overflowY = "hidden"
        else
            document.querySelector<HTMLElement>("body")!.style.overflowY = "auto"

    }, [emailVerify.isOpen])

    return <>
        <div onClick={emailVerify.onClose}
             className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] transition-all duration-500 z-[100] cursor-none`, emailVerify.isOpen && `block`)}>
            <CustomCursor/>
        </div>
        <div
            className={twMerge(`fixed top-[50%] w-[70vw] min-w-[95%] sm:min-w-[350px] max-w-[600px] md:px-4 lg:px-6 xl:px-8 left-[50%] translate-x-[-50%]
                translate-y-[-50%] bg-white transition-all origin-center hidden z-[101] px-4 rounded-lg`, emailVerify.isOpen && `block`)}>
            <AiFillCloseCircle className={"absolute top-4 right-4 w-7 h-7"} onClick={emailVerify.onClose}/>
            <div className="mx-auto px-4 py-16 flex flex-col items-center justify-center">
                <div className={"mb-4 bg-[#d1f9de] p-4 rounded-full"}>
                    <MdEmail className={"text-green-500 w-7 h-7"}/>
                </div>
                <h1 className="text-3xl font-bold text-center mb-4 text-[#384454]">Please verify your email</h1>
                <p className="text-gray-600 text-center text-[16px]">
                    You're almost there! We sent an email to
                    <span className="font-bold text-[#384454] block text-lg mt-1">{email}</span>
                </p>
                <p className="text-gray-600 text-center mt-4">
                    Just click on the link in that email to complete your signup.
                </p>
                <p className="text-gray-600 text-center">
                    If you don't see it, you may need to
                    <span className="font-bold text-[#384454]">
                    {" "} check your spam {" "}
                    </span>
                    folder.
                </p>
                <p className={"mt-6"}>Still can't find the email? No problem</p>
                <div className="flex justify-center mt-6">
                    <a href="#"
                       className="px-4 py-3 bg-[#384454] text-white font-bold rounded shadow-sm hover:bg-blue-700">Resend
                        Verification Email</a>
                </div>
            </div>
        </div>
    </>
}

export default EmailVerifyModal;