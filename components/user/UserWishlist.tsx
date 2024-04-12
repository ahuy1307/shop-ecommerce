import Link from "next/link";
import {AiOutlineEye} from "react-icons/ai";
import {twMerge} from "tailwind-merge";
import {useState} from "react";
import {LuTrash2} from "react-icons/lu";
import ProductWishlist from "@/components/product/ProductWishlist";

function UserWishlist() {
    const [checkHover, setCheckHover] = useState(false)

    return <div className={"grid grid-cols-2 md:grid-cols-3 gap-6 xl:gap-10 lg:grid-cols-3 xl:grid-cols-4"}>
        <ProductWishlist/>
        <ProductWishlist/>
        <ProductWishlist/>
        <ProductWishlist/>
        <ProductWishlist/>
        <ProductWishlist/>
    </div>
}

export default UserWishlist