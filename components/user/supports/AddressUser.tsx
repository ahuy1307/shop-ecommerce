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

type Props = {
    onChange: (key: string, value: string) => void
    formErrors: any
    data?: {
        province: string,
        district: string,
        ward: string
    }
}

function AddressUser({onChange, formErrors, data}: Props) {
    const {getDistrictsByProvince, getWardsByDistrict, getAllProvinces} = useLocation()
    const [provinces, setProvinces] = useState<Province[] | undefined>([])
    const [districts, setDistricts] = useState<District[] | undefined>([])
    const [wards, setWards] = useState<Ward[] | undefined>([])
    const {isOpen} = useCreateUserAddress()
    const [show, setShow] = useState({
        province: false,
        district: false,
        ward: false
    })
    const [formData, setFormData] = useState<FormData>({
        province: null,
        district: null,
        ward: null
    })

    useEffect(() => {
        const res = getAllProvinces();
        res.then((data) => {
            setProvinces(data)
        })

    }, []);

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
        if (!data)
            setFormData(
                {
                    province: null,
                    district: null,
                    ward: null
                }
            )

        const getUserAddress = async () => {
            if (data?.province) {
                const province = provinces?.find(province => province.province_name === data.province);
                if (province) {
                    setFormData(prev => ({
                        ...prev,
                        province: province
                    }));

                    const districtsData = await getDistrictsByProvince(province.province_id);
                    setDistricts(districtsData);

                    const district = districtsData?.find(district => district.district_name === data.district);
                    if (district) {
                        setFormData(prev => ({
                            ...prev,
                            district: district
                        }));

                        const wardsData = await getWardsByDistrict(district.district_id);
                        setWards(wardsData);

                        const ward = wardsData?.find(ward => ward.ward_name === data.ward);
                        if (ward) {
                            setFormData(prev => ({
                                ...prev,
                                ward: ward
                            }));
                        }
                    }
                }
            }
        };

        getUserAddress()
    }, [isOpen, provinces, getDistrictsByProvince, getWardsByDistrict]);


    const handleSelectProvince = (province: Province) => {
        setFormData(prev => {
            return {
                province: province,
                district: null,
                ward: null
            }
        })
        onChange("province", province.province_name)
        getDistrictsByProvince(province.province_id).then(data => setDistricts(data))
    }

    const handleSelectDistrict = (district: District) => {
        setFormData({...formData, district})
        getWardsByDistrict(district.district_id).then(data => setWards(data))
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
                    {<div
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