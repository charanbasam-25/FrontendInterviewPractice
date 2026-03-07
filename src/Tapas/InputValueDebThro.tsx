import { useState, useEffect, useRef } from "react";
import useDebounce from "../CustomHooks/useDebounce";
import useThrottle from "../CustomHooks/useThrottle";

function ChildScrol() {
  let divScroll = useRef(null);
  let [scrollpos, setScrollPos] = useState(0);
  useEffect(() => {
    let ele = divScroll.current;
    function handleScroll() {
      setScrollPos(ele.scrollTop);
    }
    ele.addEventListener("scroll", handleScroll);
    return () => ele.removeEventListener("scroll", handleScroll);
  }, []);

  const throttledValue = useThrottle(scrollpos, 3000);
  console.log(throttledValue, "ssssssseddddd");

  return (
    <div
      className="child-scroll"
      ref={divScroll}
      style={{ height: "200px", border: "1px solid #fff", overflow: "scroll" }}
    >
      <div style={{ height: "300px" }}></div>
    </div>
  );
}

function InputValuesDebThro() {
  let [inputValue, setInputValue] = useState("");
  let debouncedValue = useDebounce(inputValue, 300);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  console.log(debouncedValue, "debouncealue----");

  return (
    <>
      <div className="Input-value">
        <input placeholder="" onChange={handleChange} type="text" />
      </div>
      <ChildScrol />
    </>
  );
}

export default InputValuesDebThro;
