import {feature_info} from "@/components/home/feature_info";
import {twMerge} from "tailwind-merge";

function Feature() {
    return <div className={"mt-10"}>
        <div className={"grid grid-cols-2 gap-8 sm:px-20 px-10 md:px-[150px] lg:px-20 lg:grid-cols-4 xl:px-[200px]"}>
            {feature_info.map((item, index) => {
                return <div
                    className={twMerge(`flex gap-x-4 lg:justify-center`, index % 2 != 0 && `justify-end lg:justify-center`)}>
                    <item.icon className={"w-10 h-10"}/>
                    <div>
                        <p className={"font-semibold text-sm"}>{item.title}</p>
                        <p className={"text-sm"}>{item.des}</p>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default Feature