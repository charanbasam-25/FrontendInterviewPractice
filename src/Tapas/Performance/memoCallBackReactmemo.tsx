import { useState, useRef, useMemo, useEffect, memo, useCallback } from "react";

const ChildComp = memo(({ value ,click}) => {
  console.log("child comp render");
  return (
    <div className="child-comp">
      <h1>ChildComp</h1>
      <p>{value}</p>
      
      <button onClick={click}>Click</button>
    </div>
    
  );
});

function ParentCompUseMemo() {
  const list = [1, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 23];
  let [inputValue, setInputValue] = useState("");
  let [count, setCount] = useState(0);
  console.log("parentcomprender--");
  let value = useMemo(() => {
    return list.reduce((acc, currn, index) => {
      return acc + currn;
    }, 0);
  }, []);

  const handleCallback = useCallback(() => [setCount((prev) => prev + 1)], []);

  return (
    <div className="parent-usemeo">
      <div>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <p>{count}</p>
      </div>
      <ChildComp value={value} click={handleCallback} />
    </div>
  );
}

export default ParentCompUseMemo;
