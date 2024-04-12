"use client"
import UserInfomation from "@/components/user/UserInfomation";
import {useSearchParams} from "next/navigation";
import UserAddress from "@/components/user/UserAddress";

function UserContent() {
    const type = useSearchParams().get("type")
    return <div className={"mt-[80px] xl:px-[120px] md:px-[36px] sm:px-[20px] px-4"}>
        <h3>Home {">"} <span className={"text-gray-400"}>My profile</span></h3>
        <h2 className={"text-xl font-bold mt-4 hidden"}>MY PROFILE</h2>
        {type == null && <UserInfomation/>}
        {type == "address" && <UserAddress/>}
    </div>
}

export default UserContent