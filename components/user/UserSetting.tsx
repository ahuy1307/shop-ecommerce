import {DownOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Dropdown, Space} from 'antd';
import toast from "react-hot-toast";
import {FcInfo} from "react-icons/fc";
import {Switch} from 'antd';

const items: MenuProps['items'] = [
    {
        label: <a className={"text-base"} onClick={() => toast('Not Support!',
            {
                icon: <FcInfo className={"w-5 h-5"}/>,
                style: {
                    borderRadius: '10px',
                    background: 'white',
                    color: 'black',
                },
            }
        )}>Black</a>,
        key: '0',
    },
];


function UserSetting() {
    return <div>
        <div className={"flex items-center justify-between border-b border-gray-400/40 py-4"}>
            <div>
                <p className={"font-bold"}>Appearance</p>
                <p className={"text-sm text-gray-400"}>Customize how your theme looks on your device</p>
            </div>
            <Dropdown menu={{items}} trigger={['click']}>
                <div className={"flex items-center bg-gray-300/20 px-4 gap-x-2 py-2 justify-center rounded-lg"}>
                    <p>Light</p>
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path d="M10 15l-7-7 1.5-1.5L10 12.086l5.5-5.5L17 8z"/>
                    </svg>
                </div>
            </Dropdown>
        </div>
        <div className={"flex items-center justify-between border-b border-gray-400/40 py-4 mt-2"}>
            <div>
                <p className={"font-bold"}>Language</p>
                <p className={"text-sm text-gray-400"}>Select your language</p>
            </div>
            <div className={"flex items-center bg-gray-300/20 px-4 gap-x-2 py-2 justify-center rounded-lg"}>
                <p>English</p>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20">
                    <path d="M10 15l-7-7 1.5-1.5L10 12.086l5.5-5.5L17 8z"/>
                </svg>
            </div>
        </div>
        <div className={"flex items-center justify-between border-b border-gray-400/40 py-4 mt-2"}>
            <div>
                <p className={"font-bold"}>Two-factor Authentication</p>
                <p className={"text-sm text-gray-400"}>Keep your account secure by enable 2FA</p>
            </div>
            <Switch defaultChecked className={"checked:bg-red-500"}/>
        </div>
        <div className={"flex items-center justify-between border-b border-gray-400/40 py-4 mt-2"}>
            <div>
                <p className={"font-bold"}>Email Notifications</p>
                <p className={"text-sm text-gray-400"}>Receive email notifications</p>
            </div>
            <Switch defaultChecked className={"checked:bg-red-500"}/>
        </div>
    </div>
}

export default UserSetting