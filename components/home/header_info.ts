import {FreeShippingIcon, QualityIcon, RankIcon, SupportCallIcon} from "@/icon";
import {HiOutlineUser} from "react-icons/hi";
import {BsBoxSeam} from "react-icons/bs";
import {AiOutlineHeart, AiOutlineSetting} from "react-icons/ai";
import {GoHome} from "react-icons/go";
import {IoExitOutline} from "react-icons/io5";
import {GrLocation} from "react-icons/gr";

export const featureInfo = [
    {
        icon: QualityIcon,
        title: "High Quality",
        des: "crafted from top materials"
    },
    {
        icon: RankIcon,
        title: "Warrany Protection",
        des: "Over 2 years"
    },
    {
        icon: FreeShippingIcon,
        title: "Free Shipping",
        des: "Order over 150 $"
    },
    {
        icon: SupportCallIcon,
        title: "24 / 7 Support",
        des: "Dedicated support"
    }
]

export const listUserSetting = [
    {
        icon: GoHome,
        title: "Home",
        link: "/",
        type: null
    },
    {
        icon: HiOutlineUser,
        title: "Personal Information",
        link: "/user-profile",
        type: "profile"
    },
    {
        icon: BsBoxSeam,
        title: "My Orders",
        link: "/user?type=order",
        type: "order"
    },
    {
        icon: AiOutlineHeart,
        title: "My Wishlists",
        link: "/user?type=wish",
        type: "wish"
    },
    {
        icon: GrLocation,
        title: "Manage Address",
        link: "/user?type=address",
        type: "address"
    },
    // {
    //     icon: IoNotificationsOutline,
    //     title: "Notifications"
    // },
    {
        icon: AiOutlineSetting,
        title: "Settings",
        link: "/user?type=setting",
        type: "setting"
    },
    {
        icon: IoExitOutline,
        title: "Logout",
        link: "/sign-in",
        type: "logout",
    }
]