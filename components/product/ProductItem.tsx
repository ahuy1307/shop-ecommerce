import {AiOutlineEye} from "react-icons/ai";
import {useState} from "react";
import {twMerge} from "tailwind-merge";
import ProductView from "@/components/product/ProductView";
import useViewProduct from "@/hooks/useViewProduct";

function ProductItem() {
    const [checkHover, setCheckHover] = useState(false)
    const viewProduct = useViewProduct()

    return <>
        <div className={"relative cursor-pointer"} onMouseEnter={() => setCheckHover(true)}
             onMouseLeave={() => setCheckHover(false)}>
            <div className={"relative"}>
                <img
                    src="https://www.shopbloom.in/cdn/shop/files/Artboard24_20f1e816-7524-4db9-b68b-b1fa4b82e4c1_1880x.jpg?v=1709640156"
                    alt=""/>
                <AiOutlineEye
                    onClick={viewProduct.onOpen}
                    className={twMerge(`w-6 h-6 sm:w-7 sm:h-7 lg:w-6 lg:h-6 sm:top-4 sm:right-4 absolute top-2 right-0 cursor-pointer lg:opacity-0 transition-all duration-200`, checkHover && `lg:opacity-100 lg:right-2`)}/>
                <div
                    className={twMerge(`lg:absolute bottom-0 left-[50%] 
                    lg:translate-x-[-50%] bg-white text-center border py-2 border-black w-full lg:opacity-0 transition-all duration-200`, checkHover && `lg:opacity-100 lg:bottom-2`)}>
                    <span className={"font-bold"}>QUICK ADD</span>
                </div>
            </div>
            <div className={"cursor-pointer text-center mt-4"}>
                <h3 className={"text-sm hover:underline"}>
                    Glow in the Dark Football Print Long Sleeve Kids Night Suit
                </h3>
                <span className={"text-sm font-bold"}>$60.00</span>
            </div>
        </div>
    </>
}

export default ProductItem