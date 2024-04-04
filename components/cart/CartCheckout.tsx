"use client"
import CartItem from "@/components/cart/CartItem";
import {useState} from "react";

function CartCheckout() {
    const [size, setSize] = useState(2)
    return <>
        {/*Quantity in cart > 0*/}
        {size > 0 && <>
            <div className={"font-bold grid gap-x-4 grid-cols-7 bg-gray-500/10 py-4 px-4 mt-4"}>
                <p className={"col-span-6 md:col-span-2"}>PRODUCT</p>
                <p className={"text-right md:col-start-4"}>PRICE</p>
                <p className={"text-right hidden md:block"}>QUANTITY</p>
                <p className={"text-right hidden md:block"}>SUBTOTAL</p>
            </div>
            <CartItem/>
            <CartItem/>
            <p className={"border-b border-black pt-6 pb-2"}>ORDER SUMMARY</p>
            <div>
                <div className={"flex justify-between mt-6 font-bold border-b border-gray-500/40 pb-2"}>
                    <p>Subtotal</p>
                    <p className={"text-xl"}>49$</p>
                </div>
                <div className={"flex-col mt-6 border-b border-gray-500/40 pb-2"}>
                    <p className={"font-bold"}>Coupon Code</p>
                    <div className={"py-3 flex gap-x-8"}>
                        <input className={"flex-1 w-full outline-0 bg-transparent border border-gray-500/50 pl-4 py-2"}
                               placeholder={"Enter coupon code"}/>
                        <button className={"bg-black text-white rounded-md px-6 py-2"}>Check</button>
                    </div>
                </div>
                <div className={"mt-6 border-b border-gray-500/40 pb-2"}>
                    <p className={"font-bold"}>Details:</p>
                    <div className={"flex justify-between pl-3 text-sm mt-1 text-gray-500"}>
                        <p>Total price of product:</p>
                        <p>$99</p>
                    </div>
                    <div className={"flex justify-between pl-3 text-sm mt-1 text-gray-500"}>
                        <p>Discount coupon:</p>
                        <p>$20</p>
                    </div>
                    <div className={"flex justify-between pl-3 mt-1"}>
                        <p className={"text-sm"}>Total checkout:</p>
                        <p className={"text-md font-bold text-red-600"}>$79</p>
                    </div>
                </div>
            </div>
        </>}

        {size == 0 &&
            <p className={"mt-[60px] text-center text-gray-400"}>Your cart is empty</p>}

        <div className={"flex-col"}>
            {size > 0 && <button
                className={"mx-auto bg-black text-white w-full mt-6 border py-2 font-semibold text-md border-black"}>
                PROCEED TO CHECKOUT
            </button>}
            <button className={"mx-auto w-full border py-2 mt-4 font-semibold text-md border-black"}>CONTINUE SHOPPING
            </button>
        </div>
    </>
}

export default CartCheckout