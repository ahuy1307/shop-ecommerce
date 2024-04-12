import {FaRegEdit} from "react-icons/fa";
import {EditIcon} from "@/icon";
import UpdateUserInfoModal from "@/components/user/modal/UpdateUserInfoModal";
import useUpdateUserInfo from "@/hooks/useUpdateUserInfo";

function UserInfomation() {
    const updateUserInfo = useUpdateUserInfo()
    return <div>
        <h2 className={"text-xl font-bold mt-4"}>MY PROFILE</h2>
        <div className={"flex items-center justify-between mt-6"}>
            <div className={"relative w-[80px] h-[80px]"}>
                <img src="./images/login_img.png" className={"w-full h-full object-cover rounded-full"} alt=""/>
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
                <div className="mb-4 w-[50%]">
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="firstName">
                        First Name
                    </label>
                    <p className={"border border-black rounded-lg py-2 px-4"}>Robert</p>
                </div>
                <div className="mb-4 flex-1">
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="lastName">
                        Last Name
                    </label>
                    <p className={"border border-black rounded-lg py-2 px-4 "}>Ford</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                <div className={"w-[70%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Email Address
                    </label>
                    <p className={"border border-black rounded-lg py-2 px-4"}>exaple@gmail.com</p>
                </div>
                <div className={"flex-1"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Gender
                    </label>
                    <p className={"border border-black rounded-lg py-2 px-4"}>Female</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4 mt-4">
                <div className={"w-[50%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Date Of Birth
                    </label>
                    <p className={"border border-black rounded-lg py-2 px-4"}>07/13/2003</p>
                </div>
                <div className={"flex-1"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Phone
                    </label>
                    <p className={"border border-black rounded-lg py-2 px-4"}>(+84) 905369675</p>
                </div>
            </div>
            <div className={"mt-4"}>
                <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                    Address
                </label>
                <p className={"border border-black rounded-lg py-2 px-4"}>2464 Royal Ln, Mesa, New Jerry 45463</p>
            </div>
        </div>
        <UpdateUserInfoModal/>
    </div>
}

export default UserInfomation