import {useLocation} from "@/contexts/LocationProvider";
import {useEffect, useState} from "react";
import {IoIosArrowDown} from "react-icons/io";
import {twMerge} from "tailwind-merge";
import {District, Province, Ward} from "@/interface";
import useCreateUserAddress from "@/hooks/useCreateUserAddress";

type ShowState = {
    province: boolean;
    district: boolean;
    ward: boolean;
};

type FormData = {
    province: Province | null;
    district: District | null;
    ward: Ward | null;
}

type ChangeData = {
    province: string;
    district: string;
    ward: string;
}

function AddressUser({onChange, formErrors}: { onChange: (key: string, value: string) => void, formErrors: any }) {
    const {isOpen} = useCreateUserAddress()
    const {provinces, getDistrictsByProvince, getWardsByDistrict, wards, districts} = useLocation()
    const [show, setShow] = useState({
        province: false,
        district: false,
        ward: false
    })

    const handleShow = (key: keyof ShowState) => {
        if (key === "district" && !formData.province) return
        if (key === "ward" && !formData.district) return

        setShow(prevShow => ({
            province: false,
            district: false,
            ward: false,
            [key]: !prevShow[key]
        }));
    }
    
    useEffect(() => {
        setFormData(
            {
                province: null,
                district: null,
                ward: null
            }
        )
    }, [isOpen]);

    const [formData, setFormData] = useState<FormData>({
        province: null,
        district: null,
        ward: null
    })

    const handleSelectProvince = (province: Province) => {
        setFormData(prev => {
            return {
                province: province,
                district: null,
                ward: null
            }
        })
        onChange("province", province.province_name)
        getDistrictsByProvince(province.province_id)
    }

    const handleSelectDistrict = (district: District) => {
        setFormData({...formData, district})
        getWardsByDistrict(district.district_id)
        onChange("district", district.district_name)

    }

    const handleSelectWard = (ward: Ward) => {
        setFormData({...formData, ward})
        onChange("ward", ward.ward_name)
    }

    return <>
        <div className="w-full mt-3">
            <label className="block mb-1 text-sm">
                Province
            </label>
            <div className={"relative cursor-pointer"} onClick={() => handleShow("province")}>
                <p className="appearance-none block border outline-none border-neutral-900 w-full py-3 px-4 bg-white rounded-lg pr-4 shadow-sm">
                    {formData.province?.province_name || "Select City"}
                </p>
                {formErrors.province && <p className={"text-red-500 text-sm"}>{formErrors.province}</p>}
                <IoIosArrowDown
                    className={twMerge(`absolute top-[50%] right-4 translate-y-[-50%] transition-all duration-300`,
                        show.province && `rotate-180`, formErrors.province && `-translate-y-4`)}/>
                <div
                    className={twMerge(`absolute max-h-44 h-44 overflow-y-scroll top-full left-0 w-full bg-white 
                        border border-neutral-900 rounded-lg z-[100] mt-1 shadow-md scale-0 origin-top-right transition-all duration-300`, show.province && `scale-100`)}>
                    {provinces?.map((province, index) => (
                        <p key={index} onClick={() => handleSelectProvince(province)}
                           className="py-2 px-4 hover:bg-neutral-100">{province.province_name}</p>
                    ))}
                </div>
            </div>
        </div>
        <div className={"flex flex-col items-center gap-x-10"}>
            <div className="w-full mt-3">
                <label className="block mb-1 text-sm">
                    District
                </label>
                <div
                    className={twMerge(`relative cursor-pointer`, !formData.province && `cursor-not-allowed`)}
                    onClick={() => handleShow("district")}>
                    <p
                        className="appearance-none block border outline-none border-neutral-900 w-full py-3 px-4 bg-white rounded-lg pr-4 shadow-sm">
                        {formData.district?.district_name || "Select District"}
                    </p>
                    {formErrors.district && <p className={"text-red-500 text-sm"}>{formErrors.district}</p>}
                    <IoIosArrowDown
                        className={twMerge(`absolute top-[50%] right-4 translate-y-[-50%] transition-all duration-300`, show.district && `rotate-180`)}/>
                    <div
                        className={twMerge(`absolute max-h-44 h-44 overflow-y-scroll top-full left-0 w-full bg-white 
                        border border-neutral-900 rounded-lg z-[100] mt-1 shadow-md scale-0 origin-top-right transition-all duration-300`, show.district && `scale-100`)}>
                        {districts?.map((district, index) => (
                            <p key={index} onClick={() => handleSelectDistrict(district)}
                               className="py-2 px-4 hover:bg-neutral-100">{district.district_name}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full mt-3">
                <label className="block mb-1 text-sm">
                    Ward
                </label>
                <div
                    className={twMerge(`relative cursor-pointer`, !formData.district && `cursor-not-allowed`)}
                    onClick={() => handleShow("ward")}>
                    <p
                        className="appearance-none block border outline-none border-neutral-900 w-full py-3 px-4 bg-white rounded-lg pr-4 shadow-sm">
                        {formData.ward?.ward_name || "Select Ward"}
                    </p>
                    {formErrors.ward && <p className={"text-red-500 text-sm"}>{formErrors.ward}</p>}
                    <IoIosArrowDown
                        className={twMerge(`absolute top-[50%] right-4 translate-y-[-50%] transition-all duration-300`, show.ward && `rotate-180`)}/>
                    {wards.length > 0 && <div
                        className={twMerge(`absolute max-h-44 h-44 overflow-y-scroll top-full left-0 w-full bg-white 
                        border border-neutral-900 rounded-lg z-[100] mt-1 shadow-md scale-0 origin-top-right transition-all duration-300`, show.ward && `scale-100`)}>
                        {wards?.map((ward, index) => (
                            <p key={index} onClick={() => handleSelectWard(ward)}
                               className="py-2 px-4 hover:bg-neutral-100">{ward.ward_name}</p>
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    </>
}

export default AddressUser;