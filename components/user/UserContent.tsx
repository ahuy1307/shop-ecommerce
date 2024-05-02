"use client"
import UserInfomation from "@/components/user/UserInfomation";
import {useSearchParams} from "next/navigation";
import UserAddress from "@/components/user/UserAddress";
import UserSetting from "@/components/user/UserSetting";
import UserSideBar from "@/components/user/UserSideBar";
import UserWishlist from "@/components/user/UserWishlist";

function UserContent() {
    const type = useSearchParams().get("type")
    const title = type == null ? "PROFILE" :
        type == "address" ? "ADDRESS" : type == "setting" ? "SETTING" : "ORDER"
    return <div className={"mt-[80px] xl:px-[120px] md:px-[36px] sm:px-[20px] px-4"}>
        <h3>Home {">"} <span className={"text-gray-400"}>My profile</span></h3>
        <h2 className={"text-xl font-bold mt-4 md:hidden"}>MY {title}</h2>
        <div className={"flex mt-4"}>
            <UserSideBar/>
            <div className={"flex-1"}>
                {type == null && <UserInfomation/>}
                {type == "address" && <UserAddress/>}
                {type == "setting" && <UserSetting/>}
                {type == "wish" && <UserWishlist/>}
            </div>
        </div>
    </div>
}

export default UserContent