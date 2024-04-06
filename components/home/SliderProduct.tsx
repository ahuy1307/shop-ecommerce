import {ReactNode} from "react";
import {Pagination, Grid} from "swiper/modules";
import {Swiper} from "swiper/react";

function SliderProduct({children}: { children: ReactNode }) {
    const pagination = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            return '<span class="' + className + '" style="position: relative; bottom: -10px; ' +
                'background: transparent; border: 1px solid black; width: 12px;\n' +
                '    height: 12px;"></span>';
        },
    };

    return <Swiper
        pagination={pagination}
        modules={[Grid, Pagination]}
        grid={
            {
                rows: 2,
                fill: "row"
            }
        }
        slidesPerGroup={2}
        breakpoints={{
            640: {
                slidesPerView: 2,
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
                grid: {
                    rows: 1,
                    fill: "row"
                }
            },
            1700: {
                slidesPerView: 4,
                grid: {
                    rows: 1,
                    fill: "row"
                }
            },
        }}
        slidesPerView={2}
        spaceBetween={20}
        className="mySwiper">
        {children}
    </Swiper>
}

export default SliderProduct