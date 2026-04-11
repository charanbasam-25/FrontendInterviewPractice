import { useState, useEffect, useRef } from "react";

function SnakView({ value, setBars }) {
  useEffect(() => {
    let timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function onClose() {
    setBars((prev) => prev.filter((each, index) => each?.id != value.id));
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        gap: "40px",
        border: "1px solid #fff",
        objectFit: "contain",
      }}
    >
      <p>{value.name}</p>
      <p style={{ color: "red" }} onClick={onClose}>
        X
      </p>
    </div>
  );
}

function SnackBar() {
  const [bars, setBars] = useState([]);
  function addSnackbar() {
    setBars((prev) => {
      let bar = {
        id: Date.now(),
        name: `Hello ${Date.now()}`,
      };
      return [...prev, bar];
    });
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <button onClick={addSnackbar}>Add</button>
      </div>
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        {bars.map((each, index) => {
          return <SnakView value={each} id={index} setBars={setBars} />;
        })}
      </div>
    </div>
  );
}

export default SnackBar;
