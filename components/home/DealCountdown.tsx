"use client"
import {useEffect, useState} from "react";
import useCountdown from "@/hooks/useCountDown";
import useLocalStorage from "@/hooks/useLocalStorage";

function DealCountdown() {
    const [isClient, setIsClient] = useState(false)
    const [list, setList] = useLocalStorage("timer", {
        hour: 3,
        mins: 0,
        sec: 0
    })
    const {seconds, formatTime} = useCountdown(list.hour * 60 * 60 + list.mins * 60 + list.sec)

    useEffect(() => {

        const result = formatTime(seconds)
        setList({
            hour: result[0],
            mins: result[1],
            sec: result[2]
        })
    }, [seconds]);

    useEffect(() => {
        if (list.hour === 0)
            setList({
                hour: 3,
                mins: 0,
                sec: 0
            })
        setIsClient(true)
    }, []);

    if (!isClient) return null

    return <div>
        <h3 className={"text-center italic mt-4 xl:text-xl"}>Hurry, Before It's Too Late</h3>
        <div className={"flex gap-x-5 justify-center mt-2"}>
            <div className={"flex flex-col items-center"}>
                <div className={"w-[50px] text-center bg-white rounded-[10px] shadow"}>
                    <span
                        className={"text-zinc-700 text-[32px] font-normal font-digital leading-loose"}>{list.hour}</span>
                </div>
                <span>Hr</span>
            </div>
            <div className={"flex flex-col items-center"}>
                <div className={"w-[50px] text-center bg-white rounded-[10px] shadow"}>
                    <span
                        className={"text-zinc-700 text-[32px] font-normal font-digital leading-loose"}>{list.mins}</span>
                </div>
                <span>Mins</span>
            </div>
            <div className={"flex flex-col items-center"}>
                <div className={"w-[50px] text-center bg-white rounded-[10px] shadow"}>
                    <span
                        className={"text-zinc-700 text-[32px] font-normal font-digital leading-loose"}>{list.sec}</span>
                </div>
                <span>Sec</span>
            </div>
        </div>
    </div>
}

export default DealCountdown