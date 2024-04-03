"use client"
import {AiOutlinePlus} from "react-icons/ai";
import {footerInfo} from "@/components/footer/footer_info";
import {AiOutlineMinus} from "react-icons/ai";
import {useState} from "react";
import {twMerge} from "tailwind-merge";

function Footer() {
    const [listFooterInfo, setListFooterInfo] = useState(footerInfo)
    const handleExpandFooterInfo = (index: number) => {
        listFooterInfo[index].show = !listFooterInfo[index].show
        setListFooterInfo(prevState => {
            return [
                ...prevState
            ]
        })
    }

    return <footer className={""}>
        <div className={"bg-[#fde87f] px-5 pt-3 mt-20"}>
            <div className={""}>
                {listFooterInfo.map((item, index) => {
                    return <div className={"mt-3 mb-4 cursor-pointer"} onClick={() => handleExpandFooterInfo(index)}>
                        <div className={"flex justify-between border-b border-black pb-3"}>
                            <p className={"font-bold flex-1"}>{item.title}</p>
                            {item.show ? <AiOutlineMinus/> : <AiOutlinePlus/>}
                        </div>
                        <ul className={twMerge(`show-footer-info hidden`, item.show && `block`)}>
                            {item.show && item.info.map(value => {
                                return <li
                                    className={twMerge(`my-2 text-[13px] `,)}>{value}</li>
                            })}
                        </ul>
                    </div>
                })}

                <h2 className={"font-bold mt-8"}>NEWSLETTER SIGN UP</h2>
                <p className={"text-sm mt-3"}>Sign up for exclusive updates, new arrivals & insider only discounts</p>
                <div className={"flex justify-between mt-4 gap-x-5 pb-20"}>
                    <input
                        className={"bg-black outline-0 placeholder:text-[#cfcfcf] placeholder:text-sm flex-1 pl-4 py-2"}
                        placeholder={"Enter your email address"}/>
                    <button className={"bg-white text-black uppercase font-bold px-5 text-sm"}>Submit</button>
                </div>
            </div>
        </div>
        <p className={"bg-black w-full text-[#cfcfcf] text-sm pb-8 text-center pt-4"}>
            Sundyshop 2024. All right Reserveed.
        </p>
    </footer>
}

export default Footer;