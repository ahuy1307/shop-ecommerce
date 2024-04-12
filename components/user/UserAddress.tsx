import {BiPhoneCall} from "react-icons/bi";
import {EditIcon} from "@/icon";
import {IoTrash} from "react-icons/io5";
import {LuTrash2} from "react-icons/lu";
import AddressInfo from "@/components/user/AddressInfo";
import {AiOutlinePlus} from "react-icons/ai";
import useCreateUserAddress from "@/hooks/useCreateUserAddress";

function UserAddress() {
    const createUserAddress = useCreateUserAddress()
    return <div>
        <h2 className={"text-xl font-bold mt-4"}>MY ADDRESS</h2>
        <div
            className={"bg-black text-white inline-flex px-7 hover:bg-white hover:text-black border border-black " +
                "hover:transition-all hover:duration-500 py-3 rounded-lg my-6 items-center gap-x-3 cursor-pointer"}
            onClick={createUserAddress.onOpen}>
            <AiOutlinePlus/>
            <p>Add New Address</p>
        </div>
        <div className={"flex flex-col gap-y-4"}>
            <AddressInfo/>
            <AddressInfo/>
        </div>
    </div>
}

export default UserAddress