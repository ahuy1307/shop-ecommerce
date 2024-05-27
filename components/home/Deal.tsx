import DealCountdown from "@/components/home/DealCountdown";

function Deal() {
    return <div className={"px-4 py-4 bg-amber-100/20"}>
        <div className={"pt-4 flex flex-col gap-y-2 md:gap-y-5 items-center"}>
            <h3 className={"font-bold text-2xl italic xl:text-3xl"}>Deals Of The Month</h3>
            <p className={"text-center text-sm md:text-base lg:w-[70%]"}>The product deal is a special offer designed
                for
                customers, providing
                better
                value for their purchase.
                This could include discounts, bundled promotions, free gifts, or other special incentives. Deals are
                typically crafted to attract customer interest, and drive business growth.</p>
            <button
                className={"bg-black text-white px-6 md:px-8 py-2 border borer-white rounded-lg hover:bg-white hover:text-black hover:border transition-all duration-300"}>Buy
                now
            </button>
        </div>
        <DealCountdown/>
    </div>
}

export default Deal