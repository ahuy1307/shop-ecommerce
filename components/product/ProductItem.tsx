import {AiOutlineEye, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {useState} from "react";
import {twMerge} from "tailwind-merge";
import useViewProduct from "@/hooks/useViewProduct";
import useQuickAddProduct from "@/hooks/useQuickAddProduct";
import useWindowDimensions from "@/hooks/useWindowDimenssion";
import Link from "next/link";
import {Tooltip} from "antd";
import {ProductDetail} from "@/interface";

type Props = {
    data: ProductDetail
    onClick: () => void
    onCategory: () => void
}

function ProductItem({data, onClick, onCategory}: Props) {
    const [checkHover, setCheckHover] = useState(false)
    const viewProduct = useViewProduct()
    const quickAddProduct = useQuickAddProduct()
    const [isQuickAdd, setIsQuickAdd] = useState(false)
    const {width} = useWindowDimensions()
    const [indexColor, setIndexColor] = useState(0)
    const [indexSize, setIndexSize] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const handleQuickAdd = () => {
        if (width == undefined) return
        onClick()
        if (width > 768) {
            setIsQuickAdd(true)
        } else quickAddProduct.onOpen()
    }

    const handleViewProduct = () => {
        onCategory()
        onClick()
        viewProduct.onOpen()
    }

    return <>
        <div
            className={"relative cursor-pointer flex flex-col gap-y-3 hover:-translate-y-2 transition-all duration-500"}
            onMouseEnter={() => setCheckHover(true)}
            onMouseLeave={() => setCheckHover(false)}>
            <div className={"relative"}>
                <Link href={`/products/1`} className={"block h-[300px] lg:h-[400px]"}>
                    <img className={"h-full w-full object-contain"}
                         src={data && data.variants[0].colors[0].thumbnail}
                         alt=""/>
                </Link>
                <Tooltip title={"Quick view"} placement={"leftTop"} mouseEnterDelay={0} mouseLeaveDelay={0}>
                    <AiOutlineEye
                        onClick={handleViewProduct}
                        className={twMerge(`w-6 h-6 sm:w-7 sm:h-7 lg:w-6 lg:h-6 sm:top-4 sm:right-4 absolute top-2 
                    right-0 cursor-pointer lg:opacity-0 transition-all duration-200`, checkHover && `lg:opacity-100 lg:right-2`)}/>
                </Tooltip>
                <div
                    onClick={handleQuickAdd}
                    className={twMerge(`lg:absolute bottom-0 left-[50%] 
                    lg:translate-x-[-50%] lg:-bottom-2 bg-white text-center border lg:py-3 py-2 border-black w-full lg:opacity-0 transition-all duration-300 hover:bg-black hover:text-white`,
                        checkHover && `lg:opacity-100 lg:bottom-2`, isQuickAdd && `duration-0 transition-none invisible`)}>
                    <span className={"font-bold"}>QUICK ADD</span>
                </div>
                <div
                    className={twMerge(`absolute top-0 left-0 bg-white/80  w-full h-full flex-col justify-between opacity-0 flex transition-all duration-300 -z-10 translate-y-4`, isQuickAdd && `translate-y-0 opacity-100 z-10`)}>
                    <div className={"px-2 flex flex-col items-center overflow-y-scroll quick-add-item pb-4"}>
                        <p className={"font-bold mt-4"}>Size: <span className={"font-thin"}>
                            {data.variants[indexSize].size.name}
                        </span></p>
                        <div className={twMerge(`grid gap-2 mt-4`, `grid-cols-${data.variants.length}`)}>
                            {data.variants.map((item, index) => {
                                return <div key={index} onClick={() => {
                                    setIndexSize(index)
                                    setIndexColor(0)
                                }}
                                            className={twMerge(`border rounded-full px-4 py-1 border-[#cbcbcb] cursor-pointer bg-white flex justify-center`, index == indexSize && `border-black`)}>
                                    {item.size.name}
                                </div>
                            })}
                        </div>
                        <p className={"font-bold mt-6"}>Color: <span className={"font-thin"}>
                            {data.variants[indexSize].colors[indexColor].color.name.toUpperCase()}
                        </span></p>
                        <div className={"flex flex-wrap gap-x-4 mt-4"}>
                            {data.variants[indexSize].colors.map((item, index) => {
                                return <div style={{background: `${item.color.hexColor}`}} key={index}
                                            onClick={() => setIndexColor(index)}
                                            className={twMerge(`w-[30px] block rounded-full h-[30px] ring-1 ring-offset-2 hover:ring-2 ring-black transition-all duration-300 cursor-pointer`,
                                                index == indexColor && `ring-2`, item.color.hexColor == "#fff" && `border border-black`)}>
                                </div>
                            })}
                        </div>
                        <p className={"font-bold mt-6"}>Quantity: </p>
                        <div
                            className={"w-[120px] mt-1 rounded-lg border border-black flex items-center px-2 py-2 bg-white"}>
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
                    <div className={"flex gap-x-4 items-center w-full relative -top-2"}>
                        <span
                            className={"absolute bg-red-500 top-[-30px] left-[50%] w-[85%] h-[30px] translate-x-[-50%] before-background"}></span>
                        <button className={"bg-black text-white font-bold lg:py-3 py-2 flex-1"}>
                            ADD
                        </button>
                        <button className={"border border-[#acacac] font-bold lg:py-3 py-2 flex-1"}
                                onClick={() => {
                                    setIsQuickAdd(false)
                                    setQuantity(1)
                                    setIndexColor(0)
                                    setIndexSize(0)
                                }}>
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
            <Link href={"/products/1"} className={"cursor-pointer text-center"}>
                <h3 className={"text-sm hover:underline"}>
                    {data.name}
                </h3>
                <span className={"text-sm font-bold mx-auto block w-full py-2"}>${data.price}</span>
            </Link>
        </div>
    </>
}

export default ProductItem