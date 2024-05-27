"use client"
import {twMerge} from "tailwind-merge";
import {featureInfo} from "@/components/home/header_info";

function Feature() {
    return <div className={"my-16"}>
        <div className={"grid grid-cols-2 gap-8 sm:px-20 px-10 md:px-[150px] lg:px-20 lg:grid-cols-4 xl:px-[200px]"}>
            {featureInfo && featureInfo.map((item, index) => {
                return <div
                    key={index}
                    className={twMerge(`flex gap-x-4 lg:justify-center`, index % 2 != 0 && `justify-end lg:justify-center`)}>
                    <item.icon className={"w-10 h-10"}/>
                    <div>
                        <p className={"font-bold text-sm"}>{item.title}</p>
                        <p className={"text-sm"}>{item.des}</p>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default Feature