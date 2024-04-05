"use client"
import {useState} from "react";
import ProductItem from "@/components/product/ProductItem";
import {twMerge} from "tailwind-merge";

function ProductBestseller() {
    const [products, setProducts] = useState()
    return <div className={"xl:px-[120px] md:px-[36px] sm:px-[20px] px-4"}>
        <h2 className={"text-xl font-bold text-center mt-6 mb-4 md:text-2xl"}>Our Bestseller</h2>
        <div className={"grid grid-cols-2 sm:grid-cols-3 gap-4 lg:grid-cols-4"}>
            {Array(8).fill(0).map((item, index) => {
                return <div className={twMerge(index === 7 && 'sm:col-start-3 lg:col-auto')}>
                    <ProductItem/>
                </div>
            })}
        </div>
    </div>
}

export default ProductBestseller