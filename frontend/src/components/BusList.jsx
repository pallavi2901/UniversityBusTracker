import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BusList.css";

const API_URL = "http://localhost:5000/api/buses";

const BusList = ({ buses, setSelectedBus }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBuses([]);
      return;
    }
const filtered = buses.filter((bus) => {
  const number = String(bus?.BusNumber || "");
  const route = String(bus?.Route || "");
  const destination = String(bus?.Destination || "");

  return (
    number.includes(searchTerm) ||
    route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.toLowerCase().includes(searchTerm.toLowerCase())
  );
});

    setFilteredBuses(filtered);
  }, [searchTerm, buses]);

  const trackBus = (lat, lng) => {
    if (lat && lng) {
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, "_blank");
    } else {
      alert("Location not available for this bus.");
    }
  };

  return (
    <div className="bus-container">
      <input
        type="text"
        placeholder="Search by number, route or destination..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <div className="bus-list">
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => (
              <div key={bus._id || bus.id} className="bus-list-box">
                <div className="bus-card">
                  <h2>🚌 Bus #{bus.BusNumber || "N/A"}</h2>
<p><strong>Route:</strong> {bus.Route || "N/A"}</p>
<p><strong>Destination:</strong> {bus.Destination || "N/A"}</p>
<p><strong>Estimated Departure Time:</strong> {bus.Time || "N/A"}</p>

                  <button onClick={() => {
                    setSelectedBus(bus);
                    trackBus(bus.latitude, bus.longitude);
                  }}>
                    📍 Track Bus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No buses found for "{searchTerm}".</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BusList;
