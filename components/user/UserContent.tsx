import UserInfomation from "@/components/user/UserInfomation";

function UserContent() {
    return <div className={"mt-[80px] xl:px-[120px] md:px-[36px] sm:px-[20px] px-4"}>
        <h3>Home {">"} <span className={"text-gray-400"}>My profile</span></h3>
        <h2 className={"text-xl font-bold mt-4"}>MY PROFILE</h2>
        <UserInfomation/>
    </div>
}

export default UserContent