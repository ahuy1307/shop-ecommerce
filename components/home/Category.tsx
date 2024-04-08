"use client"
import {useState} from "react";
import {twMerge} from "tailwind-merge";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Grid, Pagination} from 'swiper/modules';

function Category() {
    const pagination = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            return '<span class="' + className + '" style="position: relative; bottom: -10px; ' +
                'background: transparent; border: 1px solid black; width: 12px;\n' +
                '    height: 12px;"></span>';
        },
    };

    const [categories, setCategories] = useState([1, 2, 3, 4])
    return <div className={"xl:px-[120px] md:px-[36px] sm:px-[20px] px-4 category"}>
        <div className={"relative my-10 flex justify-center items-center mb-6 mt-12"}>
            <h2 className={"text-xl font-bold md:text-2xl text-center absolute bg-white px-4 z-20"}>Shop by
                Categories</h2>
            <span className={"absolute w-full h-[1px] bg-[#232323]"}></span>
        </div>
        <div className={"pt-4"}>
            <Swiper
                pagination={pagination}
                modules={[Grid, Pagination]}
                slidesPerGroup={2}
                grid={{
                    rows: 2,
                    fill: "row",
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        grid: {
                            rows: 1,
                            fill: "row"
                        }
                    },
                    850: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        grid: {
                            rows: 1,
                            fill: "row"
                        }
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        grid: {
                            rows: 1,
                            fill: "row"
                        }
                    },
                }}
                slidesPerView={2}
                spaceBetween={20}
                className="mySwiper">
                {categories.map((item, index) => {
                    return <SwiperSlide
                        className={twMerge(`relative`)}>
                        <img src="./images/register_img.png" className={"rounded-md"} alt=""/>
                        <div
                            className={"bg-white text-black rounded-lg absolute bottom-4 w-[110px] lg:w-[150px] left-[50%] translate-x-[-50%]"}>
                        <span className={"text-sm w-full text-center block py-1"}>
                            Kids Wear
                        </span>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    </div>
}

export default Category