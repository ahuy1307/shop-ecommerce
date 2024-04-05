import {BiEdit} from "react-icons/bi";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {LuTrash2} from "react-icons/lu";

function CartItem() {
    return <div
        className={"grid gap-x-4 px-4 rounded-md mt-4 pt-2 pb-4 place-items-center grid-cols-7 border border-black"}>
        <img
            className={"w-[100px] col-span-2 md:col-span-1"}
            src="https://www.shopbloom.in/cdn/shop/files/Artboard22_3162831a-815b-4fba-ac7c-dffad5e6aecb_160x.jpg?v=1709640024"
            alt=""/>
        <div className={"col-span-4 md:ml-4 sm:col-span-4 sm:col-start-3 md:col-span-2"}>
            <p className={"md:inline text-sm lg:text-base"}>Glow in the Dark Stars Print Long
                Sleeve Kids
                Night Suit</p>
            <div className={"flex gap-x-4 items-center mt-1"}>
                <span className={"text-sm"}>0-6M / Black</span>
                <BiEdit className={"w-5 h-5"}/>
            </div>
        </div>
        <p className={"font-bold text-lg ml-auto"}>3.96$</p>
        <div
            className={"col-start-3 sm:col-start-3 md:mt-0 md:ml-10 md:col-span-1 w-[110px] lg:w-[100px] sm:mt-0 rounded-lg ml-auto  border border-black flex items-center px-2 py-2"}>
            <AiOutlineMinus className={"cursor-pointer"}/>
            <input type={"text"} value={2}
                   className={"w-full bg-transparent outline-0 text-black text-center"}/>
            <AiOutlinePlus className={"cursor-pointer"}/>
        </div>
        <p className={"font-bold text-xl ml-auto hidden md:block"}>$8.12</p>
        <LuTrash2
            className={"w-5 h-5 sm:w-6 sm:h-6 md:col-span-1 md:ml-auto col-start-5 ml-[50px] sm:mt-0 sm:col-start-5 text-red-400 sm:mr-auto"}/>
    </div>
}

export default CartItem