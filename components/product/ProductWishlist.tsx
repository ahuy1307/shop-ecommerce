import Link from "next/link";
import {LuTrash2} from "react-icons/lu";
import {twMerge} from "tailwind-merge";
import {useState} from "react";

function ProductWishlist() {
    const [checkHover, setCheckHover] = useState(false)

    return <div className={"relative cursor-pointer hover:-translate-y-2 transition-all duration-500"}
                onMouseEnter={() => setCheckHover(true)}
                onMouseLeave={() => setCheckHover(false)}>
        <div className={"relative"}>
            <Link href={"/products/1"}>
                <img
                    src="https://www.shopbloom.in/cdn/shop/files/Artboard24_20f1e816-7524-4db9-b68b-b1fa4b82e4c1_1880x.jpg?v=1709640156"
                    alt=""/>
            </Link>
            <LuTrash2
                className={twMerge(`w-5 h-5 text-red-600 sm:w-6 sm:h-6 lg:w-5 lg:h-5 sm:top-4 sm:right-4 absolute top-2 right-0 cursor-pointer lg:opacity-0 transition-all duration-200`, checkHover && `lg:opacity-100 lg:right-2`)}/>
            <div
                className={twMerge(`lg:absolute bottom-0 left-[50%] 
                    lg:translate-x-[-50%] lg:-bottom-2 bg-white text-center border py-2 border-black w-full lg:opacity-0 transition-all duration-200 hover:bg-black hover:text-white`,
                    checkHover && `lg:opacity-100 lg:bottom-0`)}>
                <span className={"font-bold"}>Move to cart</span>
            </div>
        </div>
        <div className={"cursor-pointer text-center mt-4"}>
            <h3 className={"text-sm hover:underline"}>
                Glow in the Dark Football Print Long Sleeve Kids Night Suit
            </h3>
            <span className={"text-sm font-bold"}>$60.00</span>
        </div>
    </div>
}

export default ProductWishlist