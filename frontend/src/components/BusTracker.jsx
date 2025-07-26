import React, { useEffect, useState } from "react";
import "./BusTracker.css";

const BusTracker = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/buses");
      const data = await response.json();
      setBuses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching buses:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const trackBus = (lat, lng) => {
    if (!lat || !lng) return alert("Location not available");
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bus-tracker-container">
      <h2 className="title">🚌 Live Bus Tracking</h2>
      {loading && <p>Loading buses...</p>}

      <div className="bus-table">
        <table>
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Route</th>
              <th>Destination</th>
              <th>Driver</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus, index) => (
              <tr key={index}>
                <td>{bus.BusNumber}</td>
                <td>{bus.Route}</td>
                <td>{bus.Destination}</td>
                <td>{bus.Driver}</td>
                <td>{bus.Time}</td>
                <td>
                  <button onClick={() => trackBus(bus.latitude, bus.longitude)}>
                    📍 Track Bus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusTracker;
