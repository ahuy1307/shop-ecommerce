"use client"
import {UserProfile} from "@clerk/nextjs";
import Header from "@/components/home/Header";
import UserSideBar from "@/components/user/UserSideBar";
import {useSearchParams} from "next/navigation";


function Page() {
    const type = useSearchParams().get("type")
    const title = type == null ? "PROFILE" :
        type == "address" ? "ADDRESS" : type == "setting" ? "SETTING" : type == "order" ? "ORDERS" : "WISHLIST"
    return <div>
        <Header/>
        <div className={"mt-[80px] pb-10 xl:px-[120px] md:px-[36px] sm:px-[20px] px-4"}>
            <h3>Home {">"} <span className={"text-gray-400"}>My profile</span></h3>
            <h2 className={"text-xl font-bold mt-4 md:hidden"}>MY {title}</h2>
            <div className={"flex mt-4"}>
                <UserSideBar/>
                <div className={"flex justify-center mt-4 w-full xl:w-fit"}>
                    <UserProfile path="/user-profile"/>
                </div>
            </div>
        </div>
    </div>
}

export default Page;