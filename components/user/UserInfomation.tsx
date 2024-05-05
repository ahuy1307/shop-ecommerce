import {FaRegEdit} from "react-icons/fa";
import {EditIcon} from "@/icon";
import UpdateUserInfoModal from "@/components/user/modal/UpdateUserInfoModal";
import useUpdateUserInfo from "@/hooks/useUpdateUserInfo";
import {useAuth} from "@/contexts/AuthProvider";
import {twMerge} from "tailwind-merge";
import Link from "next/link";

function UserInfomation() {
    const updateUserInfo = useUpdateUserInfo()
    const {user} = useAuth();

    return <div>
        <div className={"flex items-center justify-between mt-6"}>
            <div className={"relative w-[80px] h-[80px]"}>
                <img src={user?.avatar || `./images/no_avatar_user.jpg`}
                     className={"w-full h-full object-cover rounded-full border border-black"}
                     alt=""/>
                <div
                    className={"bg-black w-fit p-[6px] absolute bottom-0 -right-2 flex items-center justify-center rounded-md"}>
                    <EditIcon className={"w-4 h-4"}/>
                </div>
            </div>
            <div className={"bg-black text-white px-4 gap-x-2 py-3 rounded-lg flex items-center cursor-pointer"}
                 onClick={updateUserInfo.onOpen}>
                <EditIcon className={"w-4 h-4"}/>
                <p className={"text-sm"}>Edit Profile</p>
            </div>
        </div>
        <div className={"mt-6"}>
            <div className="flex items-center gap-x-4">
                <div className={twMerge(`mb-4 w-[50%]`)}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="firstName">
                        {user?.role == "GITHUB" ? "Github Name" : "First Name"}
                    </label>
                    <p className={"border border-black rounded-lg px-4 py-2 h-[40px]"}>{user?.firstName || "None"}</p>
                </div>
                <div className="mb-4 flex-1">
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="lastName">
                        {user?.role == "GITHUB" ? "Github Login" : "Last Name"}
                    </label>
                    <p className={"border border-black rounded-lg py-2 px-4 "}>{user?.lastName || "None"}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                <div className={"w-[70%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        {user?.role == "GITHUB" ? "Github Address" : "Email Address"}
                    </label>
                    <Link href={user?.role == "GITHUB" ? user?.email : "#"}
                          className={"border block border-black rounded-lg py-2 px-4 hover:underline"}>{user?.email || "None"}</Link>
                </div>
                <div className={"flex-1"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Gender
                    </label>
                    <p className={"border border-black rounded-lg py-2 px-4"}>{user?.gender || "None"}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4 mt-4">
                <div className={"w-[50%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Date Of Birth
                    </label>
                    <p className={"border border-black rounded-lg py-2 px-4"}>{user?.dateOfBirth ? user.dateOfBirth.toDateString() : "None"}</p>
                </div>
                <div className={"flex-1"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Phone
                    </label>
                    <p className={"border border-black rounded-lg py-2 px-4"}>{user?.phone || "None"}</p>
                </div>
            </div>
            <div className={"mt-4"}>
                <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                    Address
                </label>
                <p className={"border border-black rounded-lg py-2 px-4"}>{user?.address || "None"}</p>
            </div>
        </div>
        <UpdateUserInfoModal/>
    </div>
}

export default UserInfomation