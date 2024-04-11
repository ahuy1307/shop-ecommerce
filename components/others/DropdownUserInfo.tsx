import React, {ReactNode} from 'react';
import {DownOutlined, SmileOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Dropdown, Space} from 'antd';
import Link from "next/link";
import {HiOutlineUser} from "react-icons/hi";
import {BsBoxSeam} from "react-icons/bs";
import {AiOutlineSetting} from "react-icons/ai";
import {IoExitOutline} from "react-icons/io5";

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link href={"/user"}
                  className={"flex items-center " + "gap-x-2 rounded-md px-2 cursor-pointer"}>
                <HiOutlineUser className={"w-4 h-4"}/>
                <p className={"px-1 text-base"}>Personal Information</p>
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link href={"/user?type=order"}
                  className={"flex items-center " + "gap-x-2 rounded-md px-2 cursor-pointer"}>
                <BsBoxSeam className={"w-4 h-4"}/>
                <p className={"px-1 text-base"}>My Orders</p>
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link href={"/user?type=setting"}
                  className={"flex items-center " + "gap-x-2 rounded-md px-2 cursor-pointer"}>
                <AiOutlineSetting className={"w-4 h-4"}/>
                <p className={"px-1 text-base"}>Setting</p>
            </Link>
        ),
    },
    {
        key: '4',
        label: (
            <Link href={"/user?type=setting"}
                  className={"flex items-center " + "gap-x-2 rounded-md px-2 cursor-pointer"}>
                <IoExitOutline className={"w-4 h-4"}/>
                <p className={"px-1 text-base"}>Logout</p>
            </Link>
        ),
    },
];

function DropdownUserInfo({children}: { children: ReactNode }) {
    return <Dropdown menu={{items}}>
        {children}
    </Dropdown>
}

export default DropdownUserInfo