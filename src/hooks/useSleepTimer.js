import { useState, useEffect, useRef } from "react";

function useSleepTimer(onExpire) {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const intervalRef = useRef(null);

  function startTimer(seconds) {
    setTimeRemaining(seconds);
    setTimerActive(true);
  }

  function pauseTimer(){
    clearInterval(intervalRef.current)
    setTimerActive(false)
  }

  function cancelTimer(){
    clearInterval(intervalRef.current)
    setTimerActive(false)
    setTimeRemaining(null)
  }

  useEffect(() => {
    if (!timerActive || timeRemaining === null) return;

    if (timeRemaining === 0) {
      onExpire();
      setTimerActive(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timerActive, timeRemaining]);


return {
    timeRemaining,
    timerActive,
    startTimer,
    pauseTimer,
    cancelTimer
}
}

export default useSleepTimer
