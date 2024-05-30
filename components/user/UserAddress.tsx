import AddressInfo from "@/components/user/AddressInfo";
import {AiOutlinePlus} from "react-icons/ai";
import useCreateUserAddress from "@/hooks/useCreateUserAddress";
import {useEffect} from "react";
import AddAdressInfoModal from "@/components/user/modal/AddAdressInfoModal";
import {useAuth} from "@clerk/nextjs";
import {useQuery} from "@tanstack/react-query";
import {getUserAddress} from "@/actions/user-address";
import {Address} from "@/interface";

function UserAddress() {
    const createUserAddress = useCreateUserAddress()
    const user = useAuth();

    const userAddress = useQuery({
        queryKey: ["user-address"],
        queryFn: () => getUserAddress(user.userId),
        placeholderData: []
    })

    return <div>
        <div
            className={"bg-black text-white inline-flex px-7 hover:bg-white hover:text-black border border-black " +
                "hover:transition-all hover:duration-500 py-3 rounded-lg my-6 items-center gap-x-3 cursor-pointer"}
            onClick={createUserAddress.onOpen}>
            <AiOutlinePlus/>
            <p>Add New Address</p>
        </div>
        <div className={"flex flex-col gap-y-4"}>
            {user && userAddress.data?.length > 0 && userAddress.data?.map((address: Address, index: number) => (
                <AddressInfo key={index} address={address}/>
            ))}
            {userAddress.isLoading && <p>Loading...</p>}
            {user && userAddress.data?.length == 0 && <p className={"text-center"}>No address found</p>}
        </div>
        <AddAdressInfoModal/>
    </div>
}

export default UserAddress