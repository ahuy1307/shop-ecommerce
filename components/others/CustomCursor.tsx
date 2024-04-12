"use client"
import React, {useEffect, useState} from 'react';
import {AiOutlineClose} from "react-icons/ai";

const CustomCursor = () => {
    const [cursorPosition, setCursorPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        const updateCursorPosition = (e: any) => {
            setCursorPosition({x: e.clientX, y: e.clientY});
        };

        document.addEventListener('mousemove', updateCursorPosition);

        return () => {
            document.removeEventListener('mousemove', updateCursorPosition);
        };
    }, []);

    return (
        <div className="custom-cursor bg-white rounded-full cursor-grab hidden lg:block"
             style={{left: cursorPosition.x - 20, top: cursorPosition.y - 20}}>
            <AiOutlineClose
                className={"absolute top-[50%] translate-x-[-50%] translate-y-[-50%] w-5 h-5 left-[50%]"}/>
        </div>
    );
};

export default CustomCursor;
