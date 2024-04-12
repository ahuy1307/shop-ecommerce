"use client"
import {Toaster} from "react-hot-toast";

function ToastProvider() {
    return <Toaster
        toastOptions={{
            style: {
                background: "white",
                color: "black",
            },
        }}
    />
}

export default ToastProvider