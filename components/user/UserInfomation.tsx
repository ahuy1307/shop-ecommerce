import {FaRegEdit} from "react-icons/fa";
import {EditIcon} from "@/icon";

function UserInfomation() {
    return <div>
        <div className={"flex items-center justify-between mt-6"}>
            <div className={"relative w-[80px] h-[80px]"}>
                <img src="./images/login_img.png" className={"w-full h-full object-cover rounded-full"} alt=""/>
                <div
                    className={"bg-black w-fit p-[6px] absolute bottom-0 -right-2 flex items-center justify-center rounded-md"}>
                    <EditIcon className={"w-4 h-4"}/>
                </div>
            </div>
            <div className={"bg-black text-white px-4 gap-x-2 py-3 rounded-lg flex items-center"}>
                <EditIcon className={"w-4 h-4"}/>
                <p className={"text-sm"}>Edit Profile</p>
            </div>
        </div>
        <div className={"mt-6"}>
            <div className="flex items-center gap-x-4">
                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="firstName">
                        First Name
                    </label>
                    <input id="firstName" required type="text" value={"Robert"} disabled
                           className="px-4 py-2 rounded-[10px] border border-black disabled:bg-white"/>
                </div>
                <div className="mb-4 flex-1">
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="lastName">
                        Last Name
                    </label>
                    <input id="lastName" required type="text" value={"Ford"} disabled
                           className="px-4 py-2 rounded-[10px] w-full border border-black disabled:bg-white"/>
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                <div className={"w-[80%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Email Address
                    </label>
                    <input id="email" required type="email" value={"example@gmail.com"} disabled
                           className="px-4 py-2 rounded-[10px] w-full border border-black disabled:bg-white"/>
                </div>
                <div>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Gender
                    </label>
                    <input id="gender" required type="email" value={"Female"} disabled
                           className="px-4 py-2 rounded-[10px] w-full border border-black disabled:bg-white"/>
                </div>
            </div>
            <div className="flex items-center gap-x-4 mt-4">
                <div className={"w-[60%]"}>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Date Of Birth
                    </label>
                    <input id="birth" required type="email" value={"07/13/2003"} disabled
                           className="px-4 py-2 rounded-[10px] w-full border border-black disabled:bg-white"/>
                </div>
                <div>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                        Phone
                    </label>
                    <input id="gender" required type="phone" value={"0905369675"} disabled
                           className="px-4 py-2 rounded-[10px] w-full border border-black disabled:bg-white"/>
                </div>
            </div>
            <div className={"mt-4"}>
                <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
                    Address
                </label>
                <input id="gender" required type="phone" value={"2464 Royal Ln, Mesa, New Jerry 45463"} disabled
                       className="px-4 py-2 rounded-[10px] w-full border border-black disabled:bg-white"/>
            </div>
        </div>
    </div>
}

export default UserInfomation