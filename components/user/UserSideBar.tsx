import {listUserSetting} from "@/components/home/header_info";
import {usePathname, useSearchParams} from "next/navigation";
import {twMerge} from "tailwind-merge";
import Link from "next/link";

function UserSideBar() {
    const path = usePathname()
    const type = useSearchParams().get("type")
    return <div className={"mt-4 hidden md:block"}>

        <div className={"mr-10 lg:border border-gray-500/20"}>
            <Link href={"/user"}
                  className={"flex border-y border-gray-500/20 py-4 gap-x-4 pl-4 items-center hidden lg:flex"}>
                <img src="./images/login_img.png"
                     className={"w-[70px] h-[70px] rounded-full object-cover"}
                     alt=""/>
                <div className={"flex flex-col gap-y-1"}>
                    <p>Hello 👋</p>
                    <p className={"font-bold"}>Robert Fox</p>
                </div>
            </Link>
            <div className={"flex flex-col gap-y-10 lg:my-6 lg:gap-y-4"}>
                {listUserSetting.slice(1).map(item => {
                    return <Link href={item.link}
                                 className={twMerge(`p-2 lg:py-3 rounded-md flex items-center gap-x-4 lg:pr-10 xl:pr-20 lg:rounded-none`, type == null && item.type == null && path == item.link && `bg-black text-white`,
                                     item.type !== null && item.link.includes(path) && type == item.type && `bg-black text-white`)}>
                        <item.icon className={"w-6 h-6"}/>
                        <p className={"hidden lg:block"}>{item.title}</p>
                    </Link>
                })}
            </div>
        </div>
    </div>
}

export default UserSideBar