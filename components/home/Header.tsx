"use client";
import { Logo } from "@/constants/logo";
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { CartIcon } from "@/icon";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

function Header() {
	const [showMenu, setShowMenu] = useState(false);
	const path = usePathname();
	console.log(path);

	return (
		<header className="fixed left-0 right-0 top-0 border-black border-b flex justify-between items-center px-4 h-[70px] xl:px-[120px] md:px-[36px] sm:px-[50px]">
			<div onClick={() => setShowMenu(false)} className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] transition-all duration-500`, showMenu && `block`)}></div>
			<div className="flex items-center gap-x-8 md:hidden">
				<FaBars className="w-6 h-6 cursor-pointer" onClick={() => setShowMenu(true)} />
				<BiSearch className="w-7 h-7 cursor-pointer" />
			</div>
			<div className={twMerge(` fixed top-0 translate-x-[-100%] transition-all duration-300 left-0 max-w-[400px] w-[350px] bg-white h-full`, showMenu && `block translate-x-0 `)}>
				<div className="flex justify-between items-center px-3 border-b border-[#e6e6e6] py-3">
					<p className="font-bold text-xl">Menu</p>
					<AiOutlineClose className="w-5 h-5 cursor-pointer" onClick={() => setShowMenu(false)} />
				</div>
				<Link href="/auth" className="flex items-center text-base gap-x-3 border-b border-[#e6e6e6] py-3 pl-3" onClick={() => setShowMenu(false)}>
					<FaRegUserCircle className="w-5 h-5" />
					<p>Sign In / Sign Up</p>
				</Link>
				<div className="flex items-center gap-x-3 border-b border-[#e6e6e6] py-3 pl-3 cursor-pointer" onClick={() => setShowMenu(false)}>
					<AiOutlineHeart className="w-5 h-5" />
					<p>My Wish List</p>
				</div>
			</div>
			<Link href="/">
				<Logo className="w-[90px] h-14 cursor-pointer" />
			</Link>
			<div className="flex items-center gap-x-8 md:hidden">
				<FaRegUserCircle className="w-6 h-6 cursor-pointer" />
				<CartIcon className="w-6 h-6 cursor-pointer" />
			</div>
			<div className="hidden md:flex items-center gap-x-8 xl:gap-x-14">
				<Link href="/" className={twMerge(`cursor-pointer`, path == "/" && `underline`)}>
					Home
				</Link>
				<p className="cursor-pointer">Our Products</p>
				<div className="flex items-center border border-black rounded-md px-3 py-1 gap-x-2 cursor-pointer">
					<p>Search</p>
					<BiSearch className="w-5 h-5 cursor-pointer" />
				</div>
				<div className="flex-row items-center justify-center cursor-pointer">
					<AiOutlineHeart className="w-5 h-5 mx-auto" />
					<p>Wishlist</p>
				</div>
				<div className="cursor-pointer">
					<CartIcon className="w-5 h-5 mx-auto" />
					<p>Cart</p>
				</div>
				<Link href="/auth" className="bg-black text-white rounded-md px-6 py-2">
					Login
				</Link>
			</div>
		</header>
	);
}

export default Header;
