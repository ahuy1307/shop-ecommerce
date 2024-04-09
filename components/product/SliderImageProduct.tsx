import React, {useEffect} from "react";
import Slider from "react-slick";
import {GrPrevious, GrNext} from "react-icons/gr";
import {twMerge} from "tailwind-merge";
import useWindowDimensions from "@/hooks/useWindowDimenssion";

function SampleNextArrow(props: any) {
    const {style, onClick} = props;
    return (
        <GrNext onClick={onClick} style={style}
                className={"absolute top-[50%] translate-y-[-50%] w-6 h-6 z-20 right-[-45px] cursor-pointer"}/>
    );
}

function SamplePrevArrow(props: any) {
    const {style, onClick} = props;
    return (
        <GrPrevious onClick={onClick} style={style}
                    className={"absolute top-[50%] translate-y-[-50%] w-6 h-6 z-20 left-[-45px] cursor-pointer"}/>
    );
}

type Props = {
    className?: string
}

function SliderImageProduct({className}: Props) {

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "20px",
        vertical: true,
        slidesToShow: 3,
        speed: 500,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    vertical: false
                }
            },
        ]
    };

    return (
        <div className={twMerge(`slider-container slider-image-product px-[40px]`, className)}>
            <Slider {...settings}>
                {Array(5).fill(0).map(item => {
                    return <img
                        src="https://www.shopbloom.in/cdn/shop/files/Artboard24_20f1e816-7524-4db9-b68b-b1fa4b82e4c1_1880x.jpg?v=1709640156"
                        alt=""/>
                })}
            </Slider>
        </div>
    );
}

export default SliderImageProduct;
