import React, { useEffect, useState, useContext, useRef } from "react";
import { UserSessionContext } from "../context/UserSessionContext";

const ProgressBar = ({ timerActive }) => {
  const { pageChangeIntervalInMs } = useContext(UserSessionContext);

  const timerRef = useRef(null);
  const prevTimerActive = useRef(false);

  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    // sets interval
    if (timerActive && !prevTimerActive.current) {
      setCurrentProgress(0);
      timerRef.current = setInterval(updateProgress, 100);
    }

    if (!timerActive && prevTimerActive.current) {
      clearInterval(timerRef.current);
      setCurrentProgress(0);
    }

    prevTimerActive.current = timerActive;

    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  const updateProgress = () => {
    const tick = 10 / pageChangeIntervalInMs;
    setCurrentProgress((prevProgress) => {
      if (prevProgress >= 100) {
        return 0;
      }
      return prevProgress + tick;
    });
  };

  return (
    <progress
      value={currentProgress}
      max={100}
      style={{
        width: "100%",
        height: "5px",
        position: "fixed",
        bottom: "0px",
        left: "0px",
        zIndex: 9999,
      }}
    />
  );
};

export default ProgressBar;
