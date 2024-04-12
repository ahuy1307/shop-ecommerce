"use client"
import Header from "@/components/home/Header";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import ProductBestseller from "@/components/product/ProductBestseller";
import Feature from "@/components/home/Feature";
import Deal from "@/components/home/Deal";
import {Suspense} from "react";

export default function Home() {
    return (
        <div>
            <Suspense>
                <Header/>
            </Suspense>
            <Banner/>
            <Deal/>
            <Category/>
            <ProductBestseller/>
            <Feature/>
            <Footer/>
        </div>
    );
}
