import {twMerge} from "tailwind-merge";
import useViewProduct from "@/hooks/useViewProduct";
import {useEffect, useRef, useState} from "react";
import {AiOutlineClose, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import CustomCursor from "@/components/others/CustomCursor";
import SliderImageProduct from "@/components/product/SliderImageProduct";
import {Category, ProductDetail} from "@/interface";

function ProductView({data, category}: { data: ProductDetail, category: Category }) {
    const viewProduct = useViewProduct()
    const modalRef = useRef<HTMLDivElement>(null)
    const [indexColor, setIndexColor] = useState(0)
    const [indexSize, setIndexSize] = useState(0)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const body = document.querySelector<HTMLElement>("body")
        if (viewProduct.isOpen) {
            if (modalRef.current)
                modalRef.current.scrollTop = 0
            document.querySelector<HTMLElement>("body")!.style.overflowY = "hidden"
        } else {
            document.querySelector<HTMLElement>("body")!.style.overflowY = "auto"
            setQuantity(1)
            setIndexColor(0)
            setIndexSize(0)
        }

    }, [viewProduct.isOpen])


    return <>
        <div onClick={viewProduct.onClose}
             className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] transition-all duration-500 z-[100] cursor-none`, viewProduct.isOpen && `block`)}>
            <CustomCursor/>
        </div>
        <div

            className={twMerge(`fixed top-[50%] w-[calc(100%-50px)] lg:w-[1024px] left-[50%] translate-x-[-50%]
                translate-y-[-50%] bg-white h-[85%] transition-all origin-center block z-[101] duration-300 scale-[0.001]`, viewProduct.isOpen && `scale-100`)}>
            <div className={"pt-8 h-full"}>
                <div className={"absolute -right-3 -top-3 bg-black p-1"} onClick={viewProduct.onClose}>
                    <AiOutlineClose className={"w-5 h-5 text-white"}/>
                </div>
                <div className={"relative overflow-y-scroll h-full md:flex md:items-center"} ref={modalRef}>
                    <SliderImageProduct data={data}/>
                    <div className={"px-8"}>
                        <h3 className={"font-bold"}>
                            {data && data.name}
                        </h3>
                        <p className={"mt-2 text-gray-500"}>Availability: In stock</p>
                        <p className={"text-gray-500"}>Product Type: {category && category.name}</p>
                        <p className={"font-bold mt-2 text-lg"}>Price: ${data && data.price}</p>
                        <p className={"font-bold mt-4"}>Size: <span className={"font-thin"}>
                            {data && data.variants[indexSize].size.name}
                        </span></p>
                        <div className={"flex flex-wrap gap-x-4 mt-2"}>
                            {data && data.variants.map((item, index) => {
                                return <div key={index} onClick={() => {
                                    setIndexSize(index)
                                    setIndexColor(0)
                                }}
                                            className={twMerge(`border px-4 py-1 border-[#cbcbcb] cursor-pointer`, index == indexSize && `border-black`)}>
                                    {item.size.name}
                                </div>
                            })}
                        </div>
                        <p className={"font-bold mt-4"}>Color: <span className={"font-thin"}>
                            {data && data.variants[indexSize].colors[indexColor].color.name.toUpperCase()}
                        </span></p>
                        <div className={"flex flex-wrap gap-x-4 mt-2"}>
                            {data && data.variants[indexSize].colors.map((item, index) => {
                                return <div style={{background: `${item.color.hexColor}`}} key={index}
                                            onClick={() => setIndexColor(index)}
                                            className={twMerge(`cursor-pointer w-[35px] rounded-full h-[35px] ring-1 ring-offset-2 ring-black`,
                                                index == indexColor && `ring-2`, item.color.hexColor == "#fff" && `border border-black`)}>
                                </div>
                            })}
                        </div>
                        <p className={"mt-4 text-[#d62828]"}>Hurry up! only {
                            data && data.variants[indexSize].colors[indexColor].quantityStock
                        } left</p>
                        <p className={"font-bold mt-6"}>Quantity: </p>
                        <div
                            className={"w-[120px] mt-2 rounded-lg border border-black flex items-center px-2 py-2"}>
                            <AiOutlineMinus onClick={() => {
                                setQuantity(prev => prev - 1)
                                if (quantity <= 1)
                                    setQuantity(1)
                            }}
                                            className={"cursor-pointer w-6 h-6"}/>
                            <input type={"text"} value={quantity}
                                   className={"w-full bg-transparent outline-0 text-black text-center"}/>
                            <AiOutlinePlus onClick={() => {
                                if (quantity == data.variants[indexSize].colors[indexColor].quantityStock)
                                    return;
                                setQuantity(prev => prev + 1)
                            }}
                                           className={"cursor-pointer w-6 h-6"}/>
                        </div>
                        <div className={"w-[calc(100%-70px)] md:w-full"}>
                            <div className={"flex gap-x-4 items-center pb-3 pt-5"}>
                                <button
                                    className={"bg-black text-white border border-black flex-1 font-bold py-3 hover:bg-white hover:text-black duration-500 transition-all"}>
                                    ADD TO CART
                                </button>
                                <div className={"bg-black p-3 rounded-full"}>
                                    <AiOutlineHeart className={"text-white w-6 h-6"}/>
                                </div>
                            </div>
                            <button
                                className={"border border-[#acacac] w-full bg-[#1990c6] text-white font-bold py-3 mb-6 hover:bg-blue-500 hover:text-white hover:shadow-xl duration-500 transition-all"}>
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