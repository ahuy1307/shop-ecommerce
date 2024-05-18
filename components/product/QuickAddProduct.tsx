import useViewProduct from "@/hooks/useViewProduct";
import {useEffect} from "react";
import {twMerge} from "tailwind-merge";
import {AiOutlineClose, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import SliderImageProduct from "@/components/product/SliderImageProduct";
import useQuickAddProduct from "@/hooks/useQuickAddProduct";

function QuickAddProduct() {
    const quickAddProduct = useQuickAddProduct()

    useEffect(() => {
        const body = document.querySelector<HTMLElement>("body")
        if (quickAddProduct.isOpen)
            document.querySelector<HTMLElement>("body")!.style.overflowY = "hidden"
        else
            document.querySelector<HTMLElement>("body")!.style.overflowY = "auto"

    }, [quickAddProduct.isOpen])


    return <>
        <div onClick={quickAddProduct.onClose}
             className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] transition-all duration-500 z-[100] cursor-none`, quickAddProduct.isOpen && `block`)}></div>
        <div
            className={twMerge(`fixed top-[50%] w-[70vw] min-w-[95%] sm:min-w-[350px] max-w-[450px] left-[50%] translate-x-[-50%]
                translate-y-[-50%] bg-white transition-all origin-center hidden z-[101]`, quickAddProduct.isOpen && `block`)}>
            <div className={"pt-8"}>
                <div className={"px-8 flex flex-col items-center max-h-[260px] min-h-[214px]"}>
                    <p className={"font-bold mt-4"}>Size: <span className={"font-thin"}>XL</span></p>
                    <div className={"flex flex-wrap gap-x-4 mt-2"}>
                        {Array(3).fill(0).map((item, index) => {
                            return <div key={index}
                                        className={twMerge(`border rounded-full px-4 py-1 border-[#cbcbcb] cursor-pointer`, index == 1 && `border-black`)}>
                                XL
                            </div>
                        })}
                    </div>
                    <p className={"font-bold mt-4"}>Color: <span className={"font-thin"}>Black</span></p>
                    <div className={"flex flex-wrap gap-x-4 mt-2"}>
                        {Array(3).fill("#232323").map((item, index) => {
                            return <div key={index}
                                        className={twMerge(`w-[35px] rounded-full h-[35px] bg-[${item}] ring-1 ring-offset-2 ring-black`)}>
                            </div>
                        })}
                    </div>
                    <p className={"font-bold mt-6"}>Quantity: </p>
                    <div
                        className={"w-[120px] mt-1 rounded-lg border border-black flex items-center px-2 py-2"}>
                        <AiOutlineMinus className={"cursor-pointer w-6 h-6"}/>
                        <input type={"text"} value={2} onChange={() => {
                        }}
                               className={"w-full bg-transparent outline-0 text-black text-center"}/>
                        <AiOutlinePlus className={"cursor-pointer w-6 h-6"}/>
                    </div>
                </div>
                <div className={"flex gap-x-4 items-center pb-3 pt-5 w-full px-8    "}>
                    <button className={"bg-black text-white font-bold py-2 flex-1"}>
                        ADD
                    </button>
                    <button className={"border border-[#acacac] font-bold py-2 flex-1"}
                            onClick={quickAddProduct.onClose}>
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default QuickAddProduct