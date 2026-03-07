import { useEffect, useState } from "react";


// dont setstate with the deroived result agian, becaus eit will cause rerdenrs. so her total is directly used instead of setting int he state 
function DerivedState() {
  const [items, setTimes] = useState([]);

  useEffect(() => {
    setTimes([1, 2, 2, 2, 2, 2, 2, 2, 2]);
  }, []);

  let total = items.reduce((acc, curr, index) => {
    return acc + curr;
  }, 0);

  return (
    <div className="derived">
      <p>Derevied</p>
      <span>{total ? total : 0}</span>
    </div>
  );
}

export default DerivedState
