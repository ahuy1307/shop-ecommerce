import {twMerge} from "tailwind-merge";
import useViewProduct from "@/hooks/useViewProduct";
import {useEffect} from "react";
import {AiOutlineClose, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import SliderImageProduct from "@/components/product/SliderImageProduct";
import CustomCursor from "@/components/others/CustomCursor";

function ProductView() {
    const viewProduct = useViewProduct()

    useEffect(() => {
        const body = document.querySelector<HTMLElement>("body")
        if (viewProduct.isOpen)
            document.querySelector<HTMLElement>("body")!.style.overflowY = "hidden"
        else
            document.querySelector<HTMLElement>("body")!.style.overflowY = "auto"

    }, [viewProduct.isOpen])


    return <>
        <div onClick={viewProduct.onClose}
             className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] transition-all duration-500 z-[100] cursor-none`, viewProduct.isOpen && `block`)}>
            <CustomCursor/>
        </div>
        <div
            className={twMerge(`fixed top-[50%] w-[calc(100%-50px)] lg:w-[1024px] left-[50%] translate-x-[-50%]
                translate-y-[-50%] bg-white h-[85%] transition-all origin-center hidden z-[101]`, viewProduct.isOpen && `block`)}>

            <div className={"pt-8 h-full"}>
                <div className={"absolute -right-3 -top-3 bg-black p-1"} onClick={viewProduct.onClose}>
                    <AiOutlineClose className={"w-5 h-5 text-white"}/>
                </div>
                <div className={"relative overflow-y-scroll h-full md:flex md:items-center"}>
                    <div className={"px-8 md:w-[50%]"}>
                        <img
                            src="https://www.shopbloom.in/cdn/shop/files/Artboard24_20f1e816-7524-4db9-b68b-b1fa4b82e4c1_1880x.jpg?v=1709640156"
                            alt=""/>
                        <SliderImageProduct/>
                    </div>
                    <div className={"px-8"}>
                        <h3 className={"font-bold"}>
                            Glow in the Dark Stars Print Long Sleeve Kids Night Suit
                        </h3>
                        <p className={"mt-2 text-gray-500"}>Availability: In stock</p>
                        <p className={"text-gray-500"}>Product Type: Kids Night Suit</p>
                        <p className={"font-bold mt-2 text-lg"}>Price: $39.00</p>
                        <p className={"font-bold mt-4"}>Size: <span className={"font-thin"}>XL</span></p>
                        <div className={"flex flex-wrap gap-x-4 mt-2"}>
                            {Array(3).fill(0).map((item, index) => {
                                return <div
                                    className={twMerge(`border px-4 py-1 border-[#cbcbcb] cursor-pointer`, index == 1 && `border-black`)}>
                                    XL
                                </div>
                            })}
                        </div>
                        <p className={"font-bold mt-4"}>Color: <span className={"font-thin"}>Black</span></p>
                        <div className={"flex flex-wrap gap-x-4 mt-2"}>
                            {Array(3).fill("#232323").map((item, index) => {
                                return <div
                                    className={twMerge(`w-[35px] rounded-full h-[35px] bg-[${item}] ring-1 ring-offset-2 ring-black`)}>
                                </div>
                            })}
                        </div>
                        <p className={"mt-4 text-[#d62828]"}>Hurry up! only 20 left</p>
                        <p className={"font-bold mt-6"}>Quantity: </p>
                        <div
                            className={"w-[120px] mt-1 rounded-lg border border-black flex items-center px-2 py-2"}>
                            <AiOutlineMinus className={"cursor-pointer w-6 h-6"}/>
                            <input type={"text"} value={2}
                                   className={"w-full bg-transparent outline-0 text-black text-center"}/>
                            <AiOutlinePlus className={"cursor-pointer w-6 h-6"}/>
                        </div>
                        <div className={"w-[calc(100%-70px)] md:w-full"}>
                            <div className={"flex gap-x-4 items-center pb-3 pt-5"}>
                                <button className={"bg-black text-white flex-1 font-bold py-3"}>
                                    ADD TO CART
                                </button>
                                <div className={"bg-black p-3 rounded-full"}>
                                    <AiOutlineHeart className={"text-white w-6 h-6"}/>
                                </div>
                            </div>
                            <button className={"border border-[#acacac] w-full font-bold py-3 mb-6"}>
                                BUY IT NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ProductView