import React, { useEffect, useRef } from "react";

const Map = ({ selectedBus }) => {
  const mapRef = useRef(null);
  const googleMap = useRef(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const initMap = () => {
    googleMap.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 12,
    });
  };

  useEffect(() => {
    if (selectedBus) {
      const { latitude, longitude } = selectedBus;
      const busMarker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: googleMap.current,
        title: `${selectedBus.busNumber} - ${selectedBus.destination}`,
      });

      googleMap.current.setCenter(busMarker.getPosition());
    }
  }, [selectedBus]);

  return <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }}></div>;
};

export default Map;
