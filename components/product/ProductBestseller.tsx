"use client"
import {useState} from "react";
import ProductItem from "@/components/product/ProductItem";
import Link from "next/link";
import {AiFillFire} from "react-icons/ai";
import {SwiperSlide} from "swiper/react";
import SliderProduct from "@/components/home/SliderProduct";
import ProductView from "@/components/product/ProductView";

function ProductBestseller() {
    const pagination = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            return '<span class="' + className + '" style="position: relative; bottom: -10px; ' +
                'background: transparent; border: 1px solid black; width: 12px;\n' +
                '    height: 12px;"></span>';
        },
    };
    const [products, setProducts] = useState()

    return <div className={"xl:px-[120px] md:px-[36px] sm:px-[20px] px-4 z-[99]"}>
        <div className={"flex items-center justify-center gap-x-2"}>
            <h2 className={"text-xl font-bold text-center mt-6 mb-4 md:text-2xl"}>Our Bestseller</h2>
            <AiFillFire className={"w-5 h-5 text-red-600 relative top-1 md:w-6 md:h-6"}/>
        </div>
        <div className={"product-seller sm:border-b sm:border-gray-500/40 sm:py-2 lg:border-0"}>
            <SliderProduct>
                {Array(4).fill(0).map((item, index) => {
                    return <SwiperSlide>
                        <ProductItem/>
                    </SwiperSlide>
                })}
            </SliderProduct>
        </div>
        <div className={"product-seller"}>
            <SliderProduct>
                {Array(4).fill(0).map((item, index) => {
                    return <SwiperSlide>
                        <ProductItem/>
                    </SwiperSlide>
                })}
            </SliderProduct>
        </div>
        <Link className={"bg-black text-white px-6 py-2 block w-fit mx-auto mt-8 rounded-md"} href={"/product"}>
            View All
        </Link>
        <ProductView/>
    </div>
}

export default ProductBestseller