import {BiPhoneCall} from "react-icons/bi";
import {EditIcon} from "@/icon";
import {LuTrash2} from "react-icons/lu";
import AddAdressInfoModal from "@/components/user/modal/AddAdressInfoModal";
import {Address} from "@/interface";
import {useAddress} from "@/contexts/AddressProvider";
import {useState} from "react";
import DeleteAddressModal from "@/components/user/modal/DeleteAddressModal";
import {useAuth} from "@/contexts/AuthProvider";
import toast from "react-hot-toast";
import UpdateAddressModal from "@/components/user/modal/UpdateAddressModal";

function AddressInfo({address}: { address: Address }) {
    const {deleteAddress} = useAddress()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const {user, checkUser} = useAuth()

    const handleDelete = () => {
        if (address.id === undefined || user == undefined) {
            toast.error("Failed to delete address")
            return
        }
        deleteAddress(user.id, address.id)
        checkUser()
        setShowDeleteModal(false)
    }

    return <div className={"flex justify-between items-center border-b border-gray-500/30 pb-4"}>
        <div className={"flex flex-col gap-y-1"}>
            <h3 className={"font-bold"}>{address.name}</h3>
            <p className={"text-sm pr-[24px] md:pr-0"}>
                {address.currentAddress}, {address.ward}, {address.district}, {address.province}
            </p>
            <div className={"text-sm flex items-center gap-x-2 mt-1"}>
                <BiPhoneCall className={"w-5 h-5"}/>
                <span>{address.phone}</span>
            </div>
            {address.isDefault &&
                <span className={"text-red-600 border border-red-600 px-2 mt-1 w-fit"}>Default</span>}
        </div>
        <div className={"flex flex-col gap-y-2"}>
            <div className={"flex items-center gap-x-2"}>
                <div onClick={() => setShowUpdateModal(!showUpdateModal)}
                     className={"cursor-pointer hover:opacity-80 flex items-center justify-center gap-x-2 bg-gray-300/20 rounded-lg px-[10px] py-[6px]"}>
                    <EditIcon className={"w-4 h-4"} color={"black"}/>
                    <span>Edit</span>
                </div>
                {!address.isDefault && <div
                    onClick={() => setShowDeleteModal(!showDeleteModal)}
                    className={"cursor-pointer hover:opacity-80 flex items-center justify-center gap-x-2 bg-red-500/10 rounded-lg px-[10px] py-[6px]"}>
                    <LuTrash2 className={"text-red-600"}/>
                    <span className={"text-red-600"}>Delete</span>
                </div>}
                <DeleteAddressModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}
                                    onDelete={handleDelete}/>
            </div>
            {!address.isDefault && <div
                className={"cursor-pointer flex items-center justify-center mt-1"}>
                <span className={"text-red-600 hover:text-black"}>Set as default</span>
            </div>}
        </div>
        <UpdateAddressModal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)}
                            onUpdate={() => {
                            }} address={address}/>
    </div>
}

export default AddressInfo