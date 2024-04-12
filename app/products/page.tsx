"use client"
import Footer from "@/components/footer/Footer";
import Header from "@/components/home/Header";
import {Suspense} from "react";

function Page() {
    return <>
        <Suspense>
            <Header/>
        </Suspense>
        <Footer/>
    </>
}

export default Page