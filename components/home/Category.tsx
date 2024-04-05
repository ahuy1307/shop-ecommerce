"use client"
import {useState} from "react";
import {twMerge} from "tailwind-merge";

function Category() {
    const [categories, setCategories] = useState([1, 2, 3, 4])
    return <div className={"xl:px-[120px] md:px-[36px] sm:px-[20px] px-4"}>
        <h2 className={"my-4 text-xl font-bold md:text-2xl"}>Shop by Categories</h2>
        <div className={"grid grid-cols-2 gap-4 lg:grid-cols-4 sm:grid-cols-3"}>
            {categories.map((item, index) => {
                return <div
                    className={twMerge(`relative`, index == categories.length - 1 && `sm:col-start-2 lg:col-auto`)}>
                    <img src="./images/register_img.png" className={"rounded-md"} alt=""/>
                    <div
                        className={"bg-white text-black rounded-lg absolute bottom-4 w-[100px] lg:w-[150px] left-[50%] translate-x-[-50%]"}>
                        <span className={"text-sm w-full text-center block py-1"}>
                            Kids Wear
                        </span>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default Category