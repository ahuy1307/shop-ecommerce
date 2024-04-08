"use client"
import {useState} from "react";
import ProductItem from "@/components/product/ProductItem";
import Link from "next/link";
import {SwiperSlide} from "swiper/react";
import SliderProduct from "@/components/product/SliderProduct";
import ProductView from "@/components/product/ProductView";
import QuickAddProduct from "@/components/product/QuickAddProduct";

function ProductBestseller() {
    const pagination = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            return '<span class="' + className + '" style="position: relative; bottom: -10px; ' +
                'background: transparent; border: 1px solid black; width: 12px;\n' +
                '    height: 12px;"></span>';
        },
    };
    const [products, setProducts] = useState("")

    console.log(products)
    console.log(products)
    return <div className={"xl:px-[120px] md:px-[36px] sm:px-[20px] px-4 z-[99]"}>
        <div className={"flex items-center justify-center gap-x-2 mt-4 relative"}>
            <h2 className={"text-xl font-bold text-center md:text-2xl absolute bg-white px-4 z-20"}>Our Bestseller</h2>
            <span className={"absolute w-full h-[1px] bg-[#232323]"}></span>
        </div>
        <div className={"flex justify-center my-6"}>
            <Link className={"inline-block leading-4 border-b border-black"} href={"/product"}>
                View All
            </Link>
        </div>
        <div className={"product-seller sm:border-b sm:border-gray-500/40 sm:py-2 lg:border-0"}>
            <SliderProduct>
                {Array(4).fill(0).map((item, index) => {
                    return <SwiperSlide>
                        <ProductItem onClick={(id: string) => setProducts(id)}/>
                    </SwiperSlide>
                })}
            </SliderProduct>
        </div>
        <div className={"product-seller"}>
            <SliderProduct>
                {Array(4).fill(0).map((item, index) => {
                    return <SwiperSlide>
                        <ProductItem onClick={(id: string) => setProducts(id)}/>
                    </SwiperSlide>
                })}
            </SliderProduct>
        </div>

        <ProductView/>
        <QuickAddProduct/>
    </div>
}

export default ProductBestseller