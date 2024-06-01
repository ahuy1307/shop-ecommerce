"use client"
import {AiOutlineClose, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus, AiOutlineRight} from "react-icons/ai";
import {twMerge} from "tailwind-merge";
import {useState} from "react";

function ProductDetail() {
    const [showDesc, setShowDesc] = useState(false)


    return <div className={"pt-8 h-full  md:px-[36px] xl:px-[80px] min-[1400px]:px-[120px]"}>
        <div
            className={"relative top-[60px] translate-y-[-50%] px-3 py-4 flex " +
                "items-center text-sm gap-x-1 bg-[#f6f6f6] md:bg-transparent md:text-base md:text-[#999999]"}>
            <p>Shop</p>
            <AiOutlineRight/>
            <p className={"text-[#999999]"}>Glow in the Dark Galaxy Print Long Sleeve Kids Night Suit</p>
        </div>
        <div className={"md:flex md:gap-x-6 md:justify-between px-3"}>
            <div className={"md:w-[50%] xl:flex xl:items-center xl:w-[50%]"}>
                <img
                    src="https://www.shopbloom.in/cdn/shop/files/Artboard24_20f1e816-7524-4db9-b68b-b1fa4b82e4c1_1880x.jpg?v=1709640156"
                    alt="" className={"xl:order-2 xl:w-[500px] min-[1400px]:w-[560px]"}/>
            </div>
            <div className={"md:mt-[80px]"}>
                <h3 className={"font-bold text-lg"}>
                    Glow in the Dark Stars Print Long Sleeve Kids Night Suit
                </h3>
                <p className={"text-gray-500 my-3"}>Product Type: <span className={"ml-3"}>Kids Night Suit</span></p>
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
                <p className={"font-bold mt-6"}>Quantity: </p>
                <div
                    className={"w-[120px] mt-1 rounded-lg border border-black flex items-center px-2 py-2"}>
                    <AiOutlineMinus className={"cursor-pointer w-6 h-6"}/>
                    <input type={"text"} value={2}
                           className={"w-full bg-transparent outline-0 text-black text-center"}/>
                    <AiOutlinePlus className={"cursor-pointer w-6 h-6"}/>
                </div>
                <div className={"w-full"}>
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
        <div className={"mt-10 pt-4 border-t border-[#d3d3d3] sm:hidden px-3"}>
            <div className={"flex justify-between"}>
                <p className={"font-bold text-[17px]"}>Description</p>
                <AiOutlineRight className={"w-5 h-5 cursor-pointer"} onClick={() => setShowDesc(true)}/>
            </div>
            <div
                className={twMerge(`fixed top-0 translate-y-16 left-0 bg-white h-[100vh] opacity-0 -z-10 transition-all duration-300`, showDesc && `z-[100] transition-transform duration-300 translate-y-0 opacity-100`)}>
                <div className={"flex justify-between border-b border-[#d3d3d3] px-5 py-3"}>
                    <p className={"font-bold uppercase"}>Description</p>
                    <AiOutlineClose className={"w-5 h-5 cursor-pointer"} onClick={() => setShowDesc(false)}/>
                </div>
                <div className={"flex flex-col gap-y-4 px-5 mt-6"}>
                    <p><strong>Composition:</strong> 100% Cotton </p>
                    <p><strong>Neckline:</strong> Collar </p>
                    <p><strong>Silhouette:</strong> Relaxed Fit </p>
                    <p><strong>Sleeve Length:</strong> Long Sleeve </p>
                    <p><strong>Type:</strong> Full Set </p>
                    <p>
                        <strong>The Night Suit should be charged under direct sunlight or artificial light for 2-3 hours
                            for
                            maximum glow.</strong>
                        <span> For optimal glow please charge in direct light. Please make sure front and back, both sides are kept under direct light.</span>
                    </p>
                </div>
            </div>
        </div>
        <div className={"hidden sm:block"}>
            <div className={"flex justify-center border-b border-[#d3d3d3] px-5 py-4"}>
                <p className={"font-bold border-b-4 pb-2 border-black text-lg"}>Description</p>
            </div>
            <div className={"flex flex-col gap-y-4 mt-6"}>
                <p><strong>Composition:</strong> 100% Cotton </p>
                <p><strong>Neckline:</strong> Collar </p>
                <p><strong>Silhouette:</strong> Relaxed Fit </p>
                <p><strong>Sleeve Length:</strong> Long Sleeve </p>
                <p><strong>Type:</strong> Full Set </p>
                <p>
                    <strong>The Night Suit should be charged under direct sunlight or artificial light for 2-3 hours
                        for
                        maximum glow.</strong>
                    <span> For optimal glow please charge in direct light. Please make sure front and back, both sides are kept under direct light.</span>
                </p>
            </div>
        </div>
    </div>
}

export default ProductDetail