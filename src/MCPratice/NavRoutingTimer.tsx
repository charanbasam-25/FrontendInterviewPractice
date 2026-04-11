import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function HomePage({ timer, setTimer }) {
  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        background: "#fff",
        color: "#000",
        fontSize: "100px",
        flexDirection:"column"
      }}
    >
      <p>{timer}</p>
      <p style={{ fontSize: "20px" }}>Aha you came back</p>
    </div>
  );
}

function SettingsPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        background: "#fff",
        color: "#000",
        fontSize: "100px",
      }}
    >
      Hey!!! Welcome to Settings
    </div>
  );
}

function ContactUs() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        background: "#fff",
        color: "#000",
        fontSize: "100px",
      }}
    >
      Here we go. Thanks for coming here
    </div>
  );
}

function NavRoutingTimer() {
  const [timer, setTimer] = useState(0);

  return (
    <BrowserRouter>
      <div>
        <nav
          style={{
            display: "flex",
            height: "70px",
            backgroundColor: "#fff",
            justifyContent: "end",
            gap: "20px",
            color: "#000",
          }}
        >
          <Link to="/">
            <p style={{ color: "#000" }}>Home</p>
          </Link>
          <Link to="/settings">
            <p style={{ color: "#000" }}>Settings</p>
          </Link>
          <Link to="/contact">
            <p style={{ color: "#000" }}>Contact</p>
          </Link>
        </nav>
      </div>
      <Routes>
        <Route
          path="/"
          element={<HomePage timer={timer} setTimer={setTimer} />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NavRoutingTimer;
