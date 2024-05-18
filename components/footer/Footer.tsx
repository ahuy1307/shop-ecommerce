"use client"
import {AiOutlinePlus} from "react-icons/ai";
import {footerInfo} from "@/components/footer/footer_info";
import {AiOutlineMinus} from "react-icons/ai";
import {useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";
import useWindowDimensions from "@/hooks/useWindowDimenssion";

function Footer() {
    const [listFooterInfo, setListFooterInfo] = useState(footerInfo)
    const {width} = useWindowDimensions()
    const handleExpandFooterInfo = (index: number) => {
        if (width && width > 768) return;
        listFooterInfo[index].show = !listFooterInfo[index].show
        setListFooterInfo(prevState => {
            return [
                ...prevState
            ]
        })
    }

    useEffect(() => {
        if (width == undefined) return
        setListFooterInfo(prevState => {
            const newArray = prevState.map(item => {
                return {
                    ...item,
                    show: width > 768
                }
            })
            return [...newArray]
        })
    }, [width]);


    return <footer className={""}>
        <div className={"bg-[#fde87f] px-5 pt-3 mt-4 xl:px-[120px] md:px-[36px] sm:px-[20px]"}>
            <div className={"md:flex md:gap-x-10 lg:gap-x-[100px] xl:gap-x-[150px]"}>
                {listFooterInfo.map((item, index) => {
                    return <div key={index} className={"mt-3 mb-4 cursor-pointer md:cursor-default"}
                                onClick={() => handleExpandFooterInfo(index)}>
                        <div className={"flex justify-between border-b border-black pb-3 md:border-0"}>
                            <p className={"font-bold flex-1"}>{item.title}</p>
                            {item.show ? <AiOutlineMinus className={"md:hidden"}/> : <AiOutlinePlus/>}
                        </div>
                        <ul className={twMerge(`show-footer-info hidden`, item.show && `block`)}>
                            {item.show && item.info.map((value, index) => {
                                return <li key={index}
                                           className={twMerge(`my-2 text-[13px] `,)}>{value}</li>
                            })}
                        </ul>
                    </div>
                })}

                <div className={"md:ml-auto lg:ml-0"}>
                    <h2 className={"font-bold mt-8 md:mt-3"}>NEWSLETTER SIGN UP</h2>
                    <p className={"text-sm mt-3"}>Sign up for exclusive updates, new arrivals & insider only
                        discounts</p>
                    <div className={"flex justify-between mt-4 gap-x-5 pb-20"}>
                        <input
                            className={"bg-black outline-0 placeholder:text-[#cfcfcf] text-white placeholder:text-sm flex-1 pl-4 py-2"}
                            placeholder={"Enter your email address"}/>
                        <button className={"bg-white text-black uppercase font-bold px-5 text-sm"}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <p className={"bg-black w-full text-[#cfcfcf] text-sm pb-8 text-center pt-4"}>
            Sundyshop 2024. All right Reserveed.
        </p>
    </footer>
}

export default Footer;