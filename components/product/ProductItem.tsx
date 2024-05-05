import {AiOutlineEye, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {Dispatch, SetStateAction, useState} from "react";
import {twMerge} from "tailwind-merge";
import useViewProduct from "@/hooks/useViewProduct";
import useQuickAddProduct from "@/hooks/useQuickAddProduct";
import useWindowDimensions from "@/hooks/useWindowDimenssion";
import {useRouter} from "next/navigation";
import Link from "next/link";

type Props = {
    onClick: (id: string) => void
}

function ProductItem({onClick}: Props) {
    const [checkHover, setCheckHover] = useState(false)
    const viewProduct = useViewProduct()
    const quickAddProduct = useQuickAddProduct()
    const [isQuickAdd, setIsQuickAdd] = useState(false)
    const {width} = useWindowDimensions()
    const router = useRouter()

    const handleQuickAdd = () => {
        if (width == undefined) return

        if (width > 768) {
            setIsQuickAdd(true)
        } else quickAddProduct.onOpen()
    }

    const hanldeHover = () => {
        if (width == undefined) return
        setCheckHover(false)
        if (width > 1024) {
            setIsQuickAdd(false)
        }
    }

    return <>
        <div
            className={"relative cursor-pointer flex flex-col gap-y-3 hover:-translate-y-2 transition-all duration-500"}
            onMouseEnter={() => setCheckHover(true)}
            onMouseLeave={() => setCheckHover(false)}>
            <div className={"relative"}>
                <Link href={"/products/1"}>
                    <img
                        src="https://www.shopbloom.in/cdn/shop/files/Artboard24_20f1e816-7524-4db9-b68b-b1fa4b82e4c1_1880x.jpg?v=1709640156"
                        alt=""/>
                </Link>
                <AiOutlineEye
                    onClick={viewProduct.onOpen}
                    className={twMerge(`w-6 h-6 sm:w-7 sm:h-7 lg:w-6 lg:h-6 sm:top-4 sm:right-4 absolute top-2 right-0 cursor-pointer lg:opacity-0 transition-all duration-200`, checkHover && `lg:opacity-100 lg:right-2`)}/>
                <div
                    onClick={handleQuickAdd}
                    className={twMerge(`lg:absolute bottom-0 left-[50%] 
                    lg:translate-x-[-50%] lg:-bottom-2 bg-white text-center border py-2 border-black w-full lg:opacity-0 transition-all duration-200 hover:bg-black hover:text-white`,
                        checkHover && `lg:opacity-100 lg:bottom-2`, isQuickAdd && `duration-0 transition-none invisible`)}>
                    <span className={"font-bold"}>QUICK ADD</span>
                </div>
                <div
                    className={twMerge(`absolute top-0 left-0 bg-white/80  w-full h-full flex-col justify-between opacity-0 flex transition-all duration-300 -z-10`, isQuickAdd && `opacity-100 z-10`)}>
                    <div className={"px-2 flex flex-col items-center overflow-y-scroll quick-add-item pb-4"}>
                        <p className={"font-bold mt-4"}>Size: <span className={"font-thin"}>XL</span></p>
                        <div className={"grid grid-cols-3 gap-2 mt-2"}>
                            {Array(3).fill(0).map((item, index) => {
                                return <div
                                    className={twMerge(`border rounded-full px-4 py-1 border-[#cbcbcb] cursor-pointer bg-white flex justify-center`, index == 1 && `border-black`)}>
                                    XL
                                </div>
                            })}
                        </div>
                        <p className={"font-bold mt-4"}>Color: <span className={"font-thin"}>Black</span></p>
                        <div className={"flex flex-wrap gap-x-4 mt-2"}>
                            {Array(3).fill("#232323").map((item, index) => {
                                return <div
                                    className={twMerge(`w-[30px] rounded-full h-[30px] bg-[${item}] ring-1 ring-offset-2 ring-black`)}>
                                </div>
                            })}
                        </div>
                        <p className={"font-bold mt-6"}>Quantity: </p>
                        <div
                            className={"w-[120px] mt-1 rounded-lg border border-black flex items-center px-2 py-2 bg-white"}>
                            <AiOutlineMinus className={"cursor-pointer w-6 h-6"}/>
                            <input type={"text"} value={2}
                                   className={"w-full bg-transparent outline-0 text-black text-center"}/>
                            <AiOutlinePlus className={"cursor-pointer w-6 h-6"}/>
                        </div>
                    </div>
                    <div className={"flex gap-x-4 items-center w-full relative -top-2"}>
                        <span
                            className={"absolute bg-red-500 top-[-30px] left-[50%] w-[85%] h-[30px] translate-x-[-50%] before-background"}></span>
                        <button className={"bg-black text-white font-bold py-2 flex-1"}>
                            ADD
                        </button>
                        <button className={"border border-[#acacac] font-bold py-2 flex-1"}
                                onClick={() => setIsQuickAdd(false)}>
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
            <Link href={"/products/1"} className={"cursor-pointer text-center"}>
                <h3 className={"text-sm hover:underline"}>
                    Glow in the Dark Football Print Long Sleeve Kids Night Suit
                </h3>
                <span className={"text-sm font-bold mx-auto block w-full"}>$60.00</span>
            </Link>
        </div>
    </>
}

export default ProductItem