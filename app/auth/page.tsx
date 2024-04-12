"use client"
import AuthForm from "@/components/auth/AuthForm";
import Footer from "@/components/footer/Footer";
import Header from "@/components/home/Header";
import {Suspense} from "react";

function Auth() {
    return (
        <>
            <Suspense>
                <Header/>
            </Suspense>
            <AuthForm/>
            <Footer/>
        </>
    );
}

export default Auth;
