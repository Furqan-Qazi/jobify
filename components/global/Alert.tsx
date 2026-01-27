import { useEffect, useState } from "react";

export default function Alert({
    message,
    type,
}: {
    message: string;
    type: "success" | "error";
}) {
    const [seeker, setSeeker] = useState("0");
    const [position, setPosition] = useState("right-3");

    const bgColor = type === "success" ? "bg-lime-500" : "bg-red-500";
    const color = type === "success" ? "text-lime-700" : "text-red-700";
    const timeout = 5000; //ms

    useEffect(() => {
        setTimeout(() => {
            setSeeker("1/1");
        }, 10);

        setTimeout(() => {
            setPosition("-right-100");
        }, timeout-10);
    }, [])

    return (
        <div className={`alert max-w-80 bg-white text-white px-4 pb-3 py-2 rounded-sm fixed top-3 transition-all duration-500 ${position} z-50 shadow-lg`}>
            <span className={`${color} text-sm`}>{message}</span>
            <span className={`${bgColor} absolute bottom-0 left-${seeker} transition-all duration-${timeout} right-0 h-1`}></span>
        </div>
    );
}