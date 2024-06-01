import {BiPhoneCall} from "react-icons/bi";
import {EditIcon} from "@/icon";
import {LuTrash2} from "react-icons/lu";
import {Address} from "@/interface";
import {useState} from "react";
import DeleteAddressModal from "@/components/user/modal/DeleteAddressModal";
import UpdateAddressModal from "@/components/user/modal/UpdateAddressModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteUserAddress, updateUserAddress, updateUserDefaultAddress} from "@/actions/user-address";
import toast from "react-hot-toast";
import {Modal} from "antd";
import {TiWarning} from "react-icons/ti";

function AddressInfo({address}: { address: Address }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDefaultModal, setShowDefaultModal] = useState(false)
    const queryClient = useQueryClient()

    const handleDelete = useMutation({
        mutationFn: (id: number | undefined) => deleteUserAddress(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user-address']})
            setShowDeleteModal(false)
            toast.success("Address deleted")
        },
        onError: () => {
            toast.error("Failed to delete address")
        }
    })

    const {mutateAsync: handleUpdateDefault} = useMutation({
        mutationFn: (id: number | undefined) => updateUserDefaultAddress(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user-address']})
            setShowDefaultModal(false)
            toast.success("Address updated")
        },
    })

    return <div className={"flex justify-between items-center border-b border-gray-500/30 pb-4"}>
        <div className={"flex flex-col gap-y-1"}>
            <h3 className={"font-bold"}>{address.namePerson}</h3>
            <p className={"text-sm pr-[24px] md:pr-0"}>
                {address.currentAddress}, {address.ward}, {address.district}, {address.province}
            </p>
            <div className={"text-sm flex items-center gap-x-2 mt-1"}>
                <BiPhoneCall className={"w-5 h-5"}/>
                <span>{address.phone}</span>
            </div>
            {address.default &&
                <span className={"text-red-600 border border-red-600 px-2 mt-1 w-fit"}>Default</span>}
        </div>
        <div className={"flex flex-col gap-y-2"}>
            <div className={"flex items-center gap-x-2"}>
                <div onClick={() => setShowUpdateModal(!showUpdateModal)}
                     className={"cursor-pointer hover:opacity-80 flex items-center justify-center gap-x-2 bg-gray-300/20 rounded-lg px-[10px] py-[6px]"}>
                    <EditIcon className={"w-4 h-4"} color={"black"}/>
                    <span>Edit</span>
                </div>
                {!address.default && <div
                    onClick={() => setShowDeleteModal(!showDeleteModal)}
                    className={"cursor-pointer hover:opacity-80 flex items-center justify-center gap-x-2 bg-red-500/10 rounded-lg px-[10px] py-[6px]"}>
                    <LuTrash2 className={"text-red-600"}/>
                    <span className={"text-red-600"}>Delete</span>
                </div>}
                <DeleteAddressModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}
                                    onDelete={async () => {
                                        try {
                                            await handleDelete.mutate(address.id)
                                        } catch (e) {
                                            console.log(e)
                                        }
                                    }}/>
            </div>
            {!address.default && <div onClick={() => setShowDefaultModal(true)}
                                      className={"cursor-pointer flex items-center justify-center mt-1"}>
                <span className={"text-red-600 hover:text-black"}>Set as default</span>
            </div>}
        </div>
        <UpdateAddressModal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)}
                            address={address}/>
        <Modal
            title={<div className="flex items-center justify-center gap-x-4 font-bold text-xl mb-4">
                <TiWarning className={"text-yellow-500 w-6 h-6"}/>
                <p>Change default address</p>
            </div>}
            centered
            open={showDefaultModal}
            okText={"Confirm"}
            okButtonProps={{className: "bg-yellow-500 hover:bg-yellow-600 text-white"}}
            onOk={async () => await handleUpdateDefault(address.id)}
            onCancel={() => setShowDefaultModal(false)}
        >
            <p>Are you sure to change default address ?</p>
        </Modal>
    </div>
}

export default AddressInfo