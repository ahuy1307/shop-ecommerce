import {SignIn, SignUp} from "@clerk/nextjs";
import Header from "@/components/home/Header";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Footer from "@/components/footer/Footer";

export default function Page() {
    return <div>
        <Header/>
        <div
            className="flex gap-x-4 items-center w-full justify-center md:h-screen pt-[120px] md:pt-0 px-4 md:px-6 text-sm">
            <div className="w-full h-screen overflow-hidden hidden md:block py-[80px]">
                <img src={`./images/login_img.png`}
                     className="w-full object-contain h-full" alt=""/>
            </div>
            <div className="md:w-full sm:w-[500px] w-full flex justify-center">
                <SignIn path="/sign-in" signUpUrl={"/sign-up"}/>
            </div>
        </div>
        <Footer/>
    </div>
}