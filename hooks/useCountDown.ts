import {useState, useEffect} from 'react';

function useCountdown(initialSeconds: number) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setSeconds(prevSeconds => Math.max(prevSeconds - 1, 0));
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    function formatTime(seconds: number) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return [hours, minutes, remainingSeconds]
    }

    return {seconds, formatTime};
}

export default useCountdown;
