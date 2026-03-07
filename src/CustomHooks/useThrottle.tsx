import { useState, useEffect, useRef } from "react";

function useThrottle(value, delay = 300) {
  const [throttledValue, setThrottledvalue] = useState(value);
  let timer = useRef(Date.now());
  useEffect(() => {
    let now = Date.now();
    if (now - timer.current >= delay) {
      setThrottledvalue(value);
      timer.current = now;
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
