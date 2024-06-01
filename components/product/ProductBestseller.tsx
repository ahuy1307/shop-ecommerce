"use client"
import {useState} from "react";
import ProductItem from "@/components/product/ProductItem";
import Link from "next/link";
import {SwiperSlide} from "swiper/react";
import SliderProduct from "@/components/product/SliderProduct";
import ProductView from "@/components/product/ProductView";
import QuickAddProduct from "@/components/product/QuickAddProduct";
import {useQuery} from "@tanstack/react-query";
import {getAllProducts, getProductDetail} from "@/actions/products";
import {ProductDetail} from "@/interface";
import {getCategory} from "@/actions/category";

function ProductBestseller() {
    const allProducts = useQuery(
        {
            queryKey: ["product"],
            queryFn: () => getAllProducts(),
            placeholderData: []
        }
    )

    const [productSlugSelected, setProductSlugSelected] = useState("")
    const [categoryIdSelected, setCategoryIdSelected] = useState(0)

    const product = useQuery({
        queryKey: ["product", productSlugSelected],
        queryFn: () => getProductDetail(productSlugSelected),
        enabled: !!productSlugSelected,
    })

    const categoryData = useQuery({
        queryKey: ["category", categoryIdSelected],
        queryFn: () => getCategory(categoryIdSelected),
        enabled: !!categoryIdSelected,
    })

    return <div className={"xl:px-[120px] md:px-[36px] sm:px-[20px] px-4 z-[99] pt-5"}>
        <div className={"flex items-center justify-center gap-x-2 mt-4 relative"}>
            <h2 className={"text-xl font-bold text-center md:text-2xl absolute bg-white px-8 md:px-28 z-20"}>New
                Arrivals</h2>
            <span className={"absolute w-full h-[1px] md:h-[2px] bg-[#232323]"}></span>
        </div>
        <div className={"flex justify-center my-6 mb-10 mt-10"}>
            <Link className={"inline-block leading-4 border-b border-black"} href={"/products"}>
                View All
            </Link>
        </div>
        <div className={"product-seller sm:border-b sm:border-gray-500/40 sm:py-2 lg:border-0"}>
            <SliderProduct>
                {allProducts.data?.slice(0, 5).map((item: ProductDetail, index: number) => {
                    return <SwiperSlide key={index}>
                        <ProductItem data={item} onClick={() => setProductSlugSelected(item.slug)}
                                     onCategory={() => setCategoryIdSelected(item.categoryId)}/>
                    </SwiperSlide>
                })}
            </SliderProduct>
        </div>
        <div className={"product-seller"}>
            <SliderProduct>
                {allProducts.data?.slice(6, 10).fill(0).map((item: ProductDetail, index: number) => {
                    return <SwiperSlide key={index}>
                        <ProductItem data={item} onClick={() => setProductSlugSelected(item.slug)}
                                     onCategory={() => setCategoryIdSelected(item.categoryId)}/>
                    </SwiperSlide>
                })}
            </SliderProduct>
        </div>

        <ProductView data={product.data} category={categoryData.data}/>
        <QuickAddProduct data={product.data}/>
    </div>
}

export default ProductBestseller