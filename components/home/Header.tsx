import { Logo } from "@/constants/logo";
import { FaBars } from "react-icons/fa";
function Header() {
	return (
		<header className="fixed left-0 right-0 top-0 bg-[#ece7e1] flex justify-between items-center px-4 h-[60px]">
			<Logo className="w-[90px] h-14" />
			<FaBars className="w-6 h-6 cursor-pointer" />
		</header>
	);
}

export default Header;
