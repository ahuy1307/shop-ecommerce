import {FaCaretUp} from "react-icons/fa";
import {FaCaretDown} from "react-icons/fa6";
import {twMerge} from "tailwind-merge";
import {AiOutlineSearch} from "react-icons/ai";
import {DetailPhone} from "@/interface";
import React, {useEffect, useState} from "react";
import {usePhone} from "@/contexts/PhoneProvider";
import {useAuth} from "@/contexts/AuthProvider";
import {useDebounce} from "@/hooks/useDebounce";

type Props = {
    handleChange: (value: string) => void
    handleSelect: (index: number) => void
}

function PhoneUser({handleChange, handleSelect}: Props) {
    const {phones, phonesSearch, searchPhone} = usePhone();
    const [phoneSelected, setPhoneSelected] = useState<DetailPhone | null>(phonesSearch ? phonesSearch[0] : null)
    const [phoneSearch, setPhoneSearch] = useState("")
    const [showPhones, setShowPhones] = useState<boolean>(false);
    const {user} = useAuth()
    const [data, setData] = useState("")
    const debounceSearch = useDebounce(phoneSearch, 100);

    useEffect(() => {
        const fetchSearch = async () => {
            if (debounceSearch === "") {
                searchPhone(debounceSearch)
                return;
            }

            searchPhone(debounceSearch)
        };

        fetchSearch();
    }, [debounceSearch]);

    useEffect(() => {
        setShowPhones(false)
        searchPhone("")
        setData(user?.phone.split(" ")[1] || "")
        const phone = phonesSearch?.find(phone => phone.root == user?.phone.split(" ")[0])
        setPhoneSelected(phone || (phonesSearch ? phonesSearch[0] : null))

    }, [user]);

    const handleOpenPhone = () => {
        setShowPhones(prev => {
            const check = !prev
            if (check)
                document.getElementById(`phone-${phonesSearch?.indexOf(phoneSelected as DetailPhone)}`)?.scrollIntoView()
            return !prev
        })
    }

    const handleSelectPhone = (index: number) => {
        setShowPhones(false)
        setPhoneSearch("")
        if (phonesSearch) {
            setPhoneSelected(phonesSearch[index])
        }

        handleSelect(index)
    }

    return <div
        className={"flex border items-center gap-x-2 rounded-lg h-[41.6px] border-neutral-900 cursor-pointer"}>
        <div
            onClick={handleOpenPhone}
            className={"flex items-center pr-2 gap-x-3 pl-2 select-none border-r-2 border-neutral-500"}>
            <div
                className={"flex items-center gap-x-1 h-full cursor-pointer"}>
                <img src={phoneSelected?.flag} className={"w-14 h-5 object-contain"} alt=""/>
            </div>
            {showPhones ? <FaCaretUp className={"w-5 h-5"}/> : <FaCaretDown className={"w-5 h-5"}/>}
        </div>
        <div
            className={twMerge(` absolute sm:w-[120%] w-[100%] right-0 top-full translate-y-2 bg-white 
                            border border-neutral-500 shadow-2xl rounded-md transition-all duration-300 origin-top scale-[0.001]`, showPhones && `scale-100`)}>
            <div className={"flex items-center gap-x-2 px-2"}>
                <AiOutlineSearch className={"w-7 h-7"} strokeWidth={3}/>
                <input type="text" placeholder={"Search for country..."}
                       value={phoneSearch}
                       className={"w-full border-none outline-none px-2 py-3"}
                       onChange={(e) => setPhoneSearch(e.target.value)}/>
            </div>
            <div className={"max-h-44 overflow-y-scroll"}>
                {phonesSearch && phonesSearch.map((phone, index) => {
                    return <div
                        key={index}
                        onClick={() => handleSelectPhone(index)}
                        id={`phone-${index}`}
                        className={twMerge(`flex items-center px-2 gap-x-3 py-3 
                                    border-neutral-400 border-t hover:bg-gray-500/20 cursor-pointer`, phonesSearch?.indexOf(phoneSelected as DetailPhone) == index && `bg-gray-500/20`)}>
                        <img src={phone?.flag} className={"w-8 h-5 object-contain"} alt=""/>
                        <p className={"text-sm line-clamp-1"}>{phone.country}</p>
                        <p className={"text-sm"}>({phone.root})</p>
                    </div>
                })}
            </div>
        </div>
        <div className={"flex items-center gap-x-3"}>
            <p className={"opacity-60 text-sm"}>{phoneSelected?.root}</p>
            <input onChange={(e) => {
                setData(e.target.value)
                handleChange(phoneSelected?.root + " " + e.target.value)
            }}
                   id="phone" type="text"
                   value={data}
                   className="pr-4 border-none py-2 w-full rounded-[10px] outline-none"/>
        </div>
    </div>
}

export default PhoneUser;