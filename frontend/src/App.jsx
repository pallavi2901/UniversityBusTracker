import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BusTracker from "./components/BusTracker";
import Map from "./components/Map";
import BusList from "./components/BusList";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const App = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/buses")
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.error("Error fetching buses:", err));
const updateHandler = (updatedBus) => {
  setBuses((prev) =>
    prev.map((bus) =>
      bus.BusNumber === updatedBus.BusNumber ? updatedBus : bus
    )
  );
  if (selectedBus?.BusNumber === updatedBus.BusNumber) {
    setSelectedBus(updatedBus);
  }
};


    socket.on("busLocationUpdate", updateHandler);

    return () => socket.off("busLocationUpdate", updateHandler);
  }, [selectedBus]);

  return (
    <Router>
      <div className="app-container">
        <center><h1>Welcome to Uni-Bus Tracking System</h1></center>

        <BusList buses={buses} setSelectedBus={setSelectedBus} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bustracker" element={<BusTracker />} />
        </Routes>

        {selectedBus && <Map selectedBus={selectedBus} />}
      </div>
    </Router>
  );
};

export default App;
