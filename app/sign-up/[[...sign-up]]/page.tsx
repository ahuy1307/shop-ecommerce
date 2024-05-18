"use client"
import {SignUp, useAuth} from "@clerk/nextjs";
import Header from "@/components/home/Header";
import Footer from "@/components/footer/Footer";

export default function Page() {
    return <div>
        <Header/>
        <div
            className="flex gap-x-10 items-center w-full justify-center pt-[100px] md:h-screen mt-8 md:pt-0 px-4 md:px-6 lg:px-40 text-sm">
            <div className="w-full h-screen overflow-hidden hidden md:block py-[100px]">
                <img src={`./images/register_img.png`}
                     className="w-full object-contain h-full" alt=""/>
            </div>
            <div className="md:w-full sm:w-[500px] w-full flex justify-center">
                <SignUp path="/sign-up" signInUrl={"/sign-in"}/>
            </div>
        </div>
        <div className={"md:block hidden"}>
            <Footer/>
        </div>
    </div>;
}