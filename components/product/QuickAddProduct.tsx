import useViewProduct from "@/hooks/useViewProduct";
import {useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import useQuickAddProduct from "@/hooks/useQuickAddProduct";
import {ProductDetail} from "@/interface";

function QuickAddProduct({data}: { data: ProductDetail }) {
    const quickAddProduct = useQuickAddProduct()
    const [indexColor, setIndexColor] = useState(0)
    const [indexSize, setIndexSize] = useState(0)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const body = document.querySelector<HTMLElement>("body")
        if (quickAddProduct.isOpen)
            document.querySelector<HTMLElement>("body")!.style.overflowY = "hidden"
        else {
            document.querySelector<HTMLElement>("body")!.style.overflowY = "auto"
            setIndexSize(0)
            setIndexColor(0)
            setQuantity(1)
        }

    }, [quickAddProduct.isOpen])


    return <>
        <div onClick={quickAddProduct.onClose}
             className={twMerge(`fixed bg-black/40 inset-0 h-[100vh] z-[100] scale-[0.001] block cursor-none`, quickAddProduct.isOpen && `scale-100`)}></div>
        <div
            className={twMerge(`fixed top-[50%] w-[70vw] min-w-[95%] sm:min-w-[350px] max-w-[450px] left-[50%] translate-x-[-50%]
                translate-y-[-50%] bg-white transition-all duration-300 origin-center block z-[101] scale-[0.001]`, quickAddProduct.isOpen && `scale-100`)}>
            <div className={"pt-8"}>
                <div className={"px-8 flex flex-col items-center"}>
                    <p className={"font-bold mt-4"}>Size: <span
                        className={"font-thin"}>{data && data.variants[indexSize].size.name}</span>
                    </p>
                    <div className={"flex flex-wrap gap-x-4 mt-4"}>
                        {data && data.variants.map((item, index) => {
                            return <div key={index} onClick={() => {
                                setIndexSize(index)
                                setIndexColor(0)
                            }}
                                        className={twMerge(`border rounded-full px-4 py-1 border-[#cbcbcb] cursor-pointer`, index == indexSize && `border-black`)}>
                                {item.size.name}
                            </div>
                        })}
                    </div>
                    <p className={"font-bold mt-4"}>Color: <span className={"font-thin"}>{
                        data && data.variants[indexSize].colors[indexColor].color.name.toUpperCase()
                    }</span></p>
                    <div className={"flex flex-wrap gap-x-4 mt-4"}>
                        {data && data.variants[indexSize].colors.map((item, index) => {
                            return <span style={{background: `${item.color.hexColor}`}} key={index}
                                         onClick={() => setIndexColor(index)}
                                         className={twMerge(`w-[35px] block rounded-full h-[35px] ring-1 ring-offset-2 hover:ring-2 ring-black transition-all duration-300 cursor-pointer`,
                                             index == indexColor && `ring-2`, item.color.hexColor == "#fff" && `border border-black`)}>
                            </span>
                        })}
                    </div>
                    <p className={"text-[#d62828] mt-4"}>Hurry up!
                        Only {data ? data.variants[indexSize].colors[indexColor].quantityStock : 0} left</p>
                    <p className={"font-bold mt-4"}>Quantity: </p>
                    <div
                        className={"w-[120px] mt-1 rounded-lg border border-black flex items-center px-2 py-2"}>
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
                </div>
                <div className={"flex gap-x-4 items-center pb-3 pt-5 w-full px-8 mt-3"}>
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