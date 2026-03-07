import { useEffect, useState } from "react";

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
}


export default useDebounce