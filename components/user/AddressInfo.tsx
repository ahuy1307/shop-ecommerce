import {BiPhoneCall} from "react-icons/bi";
import {EditIcon} from "@/icon";
import {LuTrash2} from "react-icons/lu";
import AddAdressInfoModal from "@/components/user/modal/AddAdressInfoModal";

function AddressInfo() {
    return <div className={"flex justify-between items-center border-b border-gray-500/30 pb-4"}>
        <div className={"flex flex-col gap-y-1"}>
            <h3 className={"font-bold"}>Robert Ford</h3>
            <p className={"text-sm"}>2464 Royal Ln, Mesa, New Jerry 45463</p>
            <div className={"text-sm flex items-center gap-x-2"}>
                <BiPhoneCall className={"w-5 h-5"}/>
                <span>(+84) 905369675</span>
            </div>
        </div>
        <div className={"flex flex-col gap-y-2"}>
            <div
                className={"flex items-center justify-center gap-x-2 bg-gray-300/20 rounded-lg px-[10px] py-[6px]"}>
                <EditIcon className={"w-4 h-4"} color={"black"}/>
                <span>Edit</span>
            </div>
            <div
                className={"flex items-center justify-center gap-x-2 bg-red-500/10 rounded-lg px-[10px] py-[6px]"}>
                <LuTrash2 className={"text-red-600"}/>
                <span className={"text-red-600"}>Delete</span>
            </div>
        </div>
        <AddAdressInfoModal/>
    </div>
}

export default AddressInfo