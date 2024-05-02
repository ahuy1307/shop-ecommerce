"use client"
import AuthForm from "@/components/auth/AuthForm";
import Footer from "@/components/footer/Footer";
import Header from "@/components/home/Header";
import {Suspense, useEffect} from "react";
import {useAuth} from "@/contexts/AuthProvider";
import {useRouter} from "next/navigation";

function Auth() {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user != undefined) router.push("/")
    }, [user]);
    
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
