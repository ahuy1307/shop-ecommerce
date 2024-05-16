import AddressInfo from "@/components/user/AddressInfo";
import {AiOutlinePlus} from "react-icons/ai";
import useCreateUserAddress from "@/hooks/useCreateUserAddress";
import {useAuth} from "@/contexts/AuthProvider";
import {useEffect} from "react";
import AddAdressInfoModal from "@/components/user/modal/AddAdressInfoModal";

function UserAddress() {
    const {user, checkUser} = useAuth()
    const createUserAddress = useCreateUserAddress()

    useEffect(() => {
        if (createUserAddress.isOpen) return
        checkUser()
    }, [createUserAddress.isOpen])

    return <div>
        <div
            className={"bg-black text-white inline-flex px-7 hover:bg-white hover:text-black border border-black " +
                "hover:transition-all hover:duration-500 py-3 rounded-lg my-6 items-center gap-x-3 cursor-pointer"}
            onClick={createUserAddress.onOpen}>
            <AiOutlinePlus/>
            <p>Add New Address</p>
        </div>
        <div className={"flex flex-col gap-y-4"}>
            {user && user?.addresses.length > 0 && user.addresses.length > 0 && user.addresses.map((address, index) => (
                <AddressInfo key={index} address={address}/>
            ))}
            {!user && <p>Loading...</p>}
            {user && user?.addresses.length == 0 && <p className={"text-center"}>No address found</p>}
        </div>
        <AddAdressInfoModal/>
    </div>
}

export default UserAddress