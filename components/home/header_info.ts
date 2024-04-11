import {FreeShippingIcon, QualityIcon, RankIcon, SupportCallIcon} from "@/icon";
import {HiOutlineUser} from "react-icons/hi";
import {BsBoxSeam} from "react-icons/bs";
import {AiOutlineSetting, AiOutlineShoppingCart} from "react-icons/ai";
import {BiMap} from "react-icons/bi";
import {GoHome} from "react-icons/go";
import {IoExitOutline} from "react-icons/io5";

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
        link: "/"
    },
    {
        icon: HiOutlineUser,
        title: "Personal Information",
        link: "/user"
    },
    {
        icon: BsBoxSeam,
        title: "My Orders",
        link: "/user?type=order"
    },
    {
        icon: BiMap,
        title: "Manage Address",
        link: "/user?type=address"
    },
    // {
    //     icon: IoNotificationsOutline,
    //     title: "Notifications"
    // },
    {
        icon: AiOutlineSetting,
        title: "Settings",
        link: "/user?type=setting"
    },
    {
        icon: IoExitOutline,
        title: "Logout",
        link: "/user?type=setting"
    }
]