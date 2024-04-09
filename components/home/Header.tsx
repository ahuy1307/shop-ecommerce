"use client";
import {Logo} from "@/constants/logo";
import {FaBars} from "react-icons/fa";
import {BiSearch} from "react-icons/bi";
import {AiOutlineHeart} from "react-icons/ai";
import {CartIcon} from "@/icon";
import Link from "next/link";
import {FaRegUserCircle} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import {useState} from "react";
import {twMerge} from "tailwind-merge";
import {usePathname} from "next/navigation";
import {listSearchTrending} from "@/constant";

function Header() {
    const [showMenu, setShowMenu] = useState("");
    const path = usePathname();
    return (
        <header
            className="fixed left-0 right-0 top-0 border-black border-b flex justify-between items-center pl-4 pr-5 h-[70px]
                                xl:px-[120px] md:px-[36px] sm:px-[20px] bg-white z-[99]">
            <div onClick={() => setShowMenu("")}
                 className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] transition-all duration-500`, showMenu != "" && `block`)}></div>
            <div className="flex items-center gap-x-8 md:hidden">
                <FaBars className="w-6 h-6 cursor-pointer" onClick={() => setShowMenu("bar")}/>
                <BiSearch className="w-7 h-7 cursor-pointer" onClick={() => setShowMenu("search")}/>
            </div>
            <div
                className={twMerge(` fixed top-0 translate-x-[-100%] transition-all duration-500 left-0 max-w-[400px] w-[350px] bg-white h-full`, showMenu != "" && `block translate-x-0 `)}>
                <div className="flex justify-between items-center px-3 border-b border-[#e6e6e6] py-3">
                    <p className="font-bold text-xl">{showMenu == "bar" ? `Menu` : `Search`}</p>
                    <AiOutlineClose className="w-5 h-5 cursor-pointer" onClick={() => setShowMenu("")}/>
                </div>
                {showMenu == "bar" ? (
                    <>
                        <Link href="/auth"
                              className="flex items-center text-base gap-x-3 border-b border-[#e6e6e6] py-3 pl-3"
                              onClick={() => setShowMenu("")}>
                            <FaRegUserCircle className="w-5 h-5"/>
                            <p>Sign In / Sign Up</p>
                        </Link>
                        <div className="flex items-center gap-x-3 border-b border-[#e6e6e6] py-3 pl-3 cursor-pointer"
                             onClick={() => setShowMenu("")}>
                            <AiOutlineHeart className="w-5 h-5"/>
                            <p>My Wish List</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className="flex items-center justify-between mx-3 my-4 px-4 py-2 bg-gray-500/10 rounded-md">
                            <input
                                className={"outline-0 focus:placeholder:text-[0px] w-full pr-4 bg-transparent placeholder:text-gray-400"}
                                type="text" placeholder="Search products..." name=""/>
                            <BiSearch className="w-5 h-5 cursor-pointer"/>
                        </div>
                        <div className={"flex-col px-4 items-center gap-x-4 border-t border-[#e6e6e6]"}>
                            <p className={"font-bold my-4 text-xl"}>TRENDING NOW</p>
                            <div className={"flex items-center gap-x-6"}>
                                {listSearchTrending.map((item) => {
                                    return (
                                        <Link href={item.url}
                                              className={"inline-flex items-center bg-gray-500/10 " + "gap-x-2 rounded-md px-2 cursor-pointer"}>
                                            <item.icon className={"w-5 h-5 text-gray-500"}/>
                                            <p className={"text-gray-500 px-1"}>{item.name}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Link href="/">
                <Logo className="w-[90px] h-14 cursor-pointer"/>
            </Link>
            <div className="flex items-center gap-x-8 md:hidden">
                <Link href={"/auth"}>
                    <FaRegUserCircle className="w-6 h-6 cursor-pointer"/>
                </Link>
                <Link href={"/cart"} className={"relative"}>
                    <CartIcon className="w-6 h-6 cursor-pointer"/>
                    <p className={"bg-black text-white absolute px-2 rounded-full -top-3 -right-3 "}>0</p>
                </Link>
            </div>
            <div className="hidden md:flex items-center gap-x-8 xl:gap-x-14">
                <Link href="/" className={twMerge(`cursor-pointer`, path == "/" && `border-b border-black`)}>
                    Home
                </Link>
                <Link href="/products"
                      className={twMerge(`cursor-pointer`, path == "/products" && `border-b border-black`)}>
                    Shop
                </Link>
                <div className="flex items-center border border-black rounded-md px-3 py-1 gap-x-2 cursor-pointer">
                    <input type={"text"} placeholder={"Search"} className={"w-[100px] outline-none lg:w-[150px]"}/>
                    <BiSearch className="w-5 h-5 cursor-pointer"/>
                </div>
                <div className="flex-row items-center justify-center cursor-pointer ">
                    <AiOutlineHeart className="w-5 h-5 mx-auto"/>
                    <p>Wishlist</p>
                </div>
                <Link href="/cart" className="cursor-pointer">
                    <CartIcon className="w-5 h-5 mx-auto"/>
                    <p>Cart</p>
                </Link>
                <Link href="/auth" className="bg-black text-white rounded-md px-6 py-2">
                    Login
                </Link>
            </div>
        </header>
    );
}

export default Header;
