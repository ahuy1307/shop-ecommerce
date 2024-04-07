import Header from "@/components/home/Header";
import Footer from "@/components/footer/Footer";
import CartCheckout from "@/components/cart/CartCheckout";

function Cart() {
    return <>
        <Header/>
        <div className={"mt-[80px] px-4 xl:px-[120px] md:px-[36px] sm:px-[50px]"}>
            <h3>Home {">"} <span className={"text-gray-400"}>Your cart</span></h3>
            <h2 className={"text-xl font-bold mt-4"}>YOUR CART</h2>
            <CartCheckout/>
        </div>

        <Footer/>
    </>;
}

export default Cart;
