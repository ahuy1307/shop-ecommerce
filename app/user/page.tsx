"use client"
import Header from "@/components/home/Header";
import Footer from "@/components/footer/Footer";
import UserContent from "@/components/user/UserContent";
import {Suspense} from "react";

function Page() {
    return <>
        <Suspense>
            <Header/>
        </Suspense>
        <Suspense>
            <UserContent/>
        </Suspense>
        <div className={"mt-12"}>
            <Footer/>
        </div>
    </>
}

export default Page