import {ProductDetail} from "@/interface";

function SliderImageProduct({data}: { data: ProductDetail }) {
    return <div className={"px-8 md:w-[50%]"}>
        <img className={"h-[400px] m-auto"}
             src={data && data.variants[0].colors[0].thumbnail}
             alt=""/>
        <div className={"grid grid-cols-3 gap-6"}>
            <img
                src="https://www.shopbloom.in/cdn/shop/files/Artboard24_20f1e816-7524-4db9-b68b-b1fa4b82e4c1_1880x.jpg?v=1709640156"
                alt=""/>
            <img
                src="https://www.shopbloom.in/cdn/shop/files/Artboard24_20f1e816-7524-4db9-b68b-b1fa4b82e4c1_1880x.jpg?v=1709640156"
                alt=""/>
            <img
                src="https://www.shopbloom.in/cdn/shop/files/Artboard24_20f1e816-7524-4db9-b68b-b1fa4b82e4c1_1880x.jpg?v=1709640156"
                alt=""/>
        </div>
    </div>
}

export default SliderImageProduct