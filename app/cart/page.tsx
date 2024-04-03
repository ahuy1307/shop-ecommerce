import Header from "@/components/home/Header";
import Footer from "@/components/footer/Footer";
import {BiEdit} from "react-icons/bi";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

function Cart() {
    return <>
        <Header/>
        <div className={"mt-[80px] px-4"}>
            <h3>Home {">"} <span className={"text-gray-400"}>Your cart</span></h3>
            <h2 className={"text-xl font-bold mt-4"}>YOUR CART</h2>
            {/*Quantity in cart > 0*/}
            <div className={"font-bold flex justify-between bg-gray-500/10 py-4 px-4"}>
                <p>PRODUCT</p>
                <p>PRICE</p>
            </div>
            <div className={"flex-col border border-black px-4"}>
                <div className={"flex items-center gap-x-4"}>
                    <img
                        className={"w-[100px]"}
                        src="https://www.shopbloom.in/cdn/shop/files/Artboard22_3162831a-815b-4fba-ac7c-dffad5e6aecb_160x.jpg?v=1709640024"
                        alt=""/>
                    <div className={""}>
                        <p>Glow in the Dark Stars Print Long Sleeve Kids Night Suit</p>
                        <span>0-6M / Black</span>
                        <BiEdit/>
                    </div>
                </div>
                <div className={"mb-9"}>
                    <p className={"font-bold text-right text-lg"}>3.96$</p>
                    <div className={"border ml-auto w-[110px] border-black flex items-center px-2 py-3"}>
                        <AiOutlineMinus className={"cursor-pointer"}/>
                        <input type={"text"} value={2}
                               className={"w-full bg-transparent outline-0 text-black text-center"}/>
                        <AiOutlinePlus className={"cursor-pointer"}/>
                    </div>
                </div>
            </div>
            {/*<p className={"mt-[60px] text-center text-gray-400 mb-4"}>Your cart is empty</p>*/}
            <button className={"mx-auto w-full border py-2 font-semibold text-md border-black"}>CONTINUE SHOPPING
            </button>
        </div>

        <Footer/>
    </>;
}

export default Cart;
