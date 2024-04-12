"use client"
import Footer from "@/components/footer/Footer";
import ProductDetail from "@/components/product/ProductDetail";
import Header from "@/components/home/Header";
import {Suspense} from "react";

function Page() {
    return <>
        <Suspense>
            <Header/>
        </Suspense>
        <ProductDetail/>
        <Footer/>
    </>
}

export default Page