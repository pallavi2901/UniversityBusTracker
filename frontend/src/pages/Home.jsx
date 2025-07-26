import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Track Buses Button (Top-Right) */}
      <div className="top-right">
        <button className="bus-tracker-button" onClick={() => navigate("/bustracker")}>
          Bus Details
        </button>
      </div>

      

      {/* Background Images */}
      <img 
        src="/hi.webp" 
        alt="Bus Stop Left" 
        className="background-image left-image" // Positioned at bottom-left
      />
      <img 
        src="/hlo.webp" 
        alt="Bus Stop Right" 
        className="background-image right-image" // Positioned at bottom-right
      />
    </div>
  );
};

export default Home;
