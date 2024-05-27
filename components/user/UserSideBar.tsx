"use client"
import {listUserSetting} from "@/components/home/header_info";
import {usePathname, useSearchParams} from "next/navigation";
import {twMerge} from "tailwind-merge";
import Link from "next/link";
import {useUser} from "@clerk/nextjs";

function UserSideBar() {
    const path = usePathname()
    const type = useSearchParams().get("type")
    const {user} = useUser()

    return <div className={"mt-4 hidden md:block"}>

        <div className={"mr-10 lg:border border-gray-500/20 lg:w-[250px] xl:w-[300px]"}>
            <Link href={"/user-profile"}
                  className={"hidden border-y border-gray-500/20 py-4 gap-x-4 pl-4 items-center lg:flex"}>
                <img src={user ? user.imageUrl : `./images/no_avatar_user.jpg`}
                     className={"w-[70px] h-[70px] rounded-full object-cover"}
                     alt=""/>
                <div className={"flex flex-col gap-y-1"}>
                    <p>Hello 👋</p>
                    <p className={"font-bold"}>{user ? user.fullName : "Loading..."}</p>
                </div>
            </Link>
            <div className={"flex flex-col gap-y-10 lg:my-6 lg:gap-y-4"}>
                {listUserSetting.slice(1, listUserSetting.length - 1).map((item, index) => {
                    return <Link key={index} href={item.link}
                                 className={twMerge(`hover:bg-gray-500/10 p-2 lg:pl-4 lg:py-3 rounded-md flex items-center gap-x-4 lg:pr-10 xl:pr-20 lg:rounded-none`, type == null && item.type == null && path == item.link && `bg-black text-white hover:bg-black`,
                                     item.type !== null && item.link.includes(path) && type == item.type && `bg-black text-white hover:bg-black`, item.type != null && path.includes(item.link) && `bg-black text-white hover:bg-black`)}>
                        <item.icon className={"w-6 h-6"}/>
                        <p className={"hidden lg:block"}>{item.title}</p>
                    </Link>
                })}
            </div>
        </div>
    </div>
}

export default UserSideBar