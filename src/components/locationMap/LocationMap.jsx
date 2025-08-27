import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationMarker = ({ initialPosition, onPositionChange }) => {
  const [position, setPosition] = useState(initialPosition || null);
  const map = useMapEvents({
    click(e) {
      const newPosition = e.latlng;
      setPosition(newPosition);
      onPositionChange(newPosition);
    },
  });

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
      map.flyTo(initialPosition, map.getZoom());
    }
  }, []);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Pharmacy Location</Popup>
    </Marker>
  );
};

const LocationMap = ({ initialLat, initialLng, onLocationSelect }) => {
  const [mapReady, setMapReady] = useState(false);
  const initialPosition =
    initialLat && initialLng ? [initialLat, initialLng] : [6.9271, 79.8612]; // Default to Colombo, Sri Lanka

  useEffect(() => {
    setMapReady(true);
  }, []);

  const handlePositionChange = (latlng) => {
    onLocationSelect(latlng.lat, latlng.lng);
  };

  if (!mapReady) return <div>Loading map...</div>;

  return (
    <div
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={initialPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker
          initialPosition={initialPosition}
          onPositionChange={handlePositionChange}
        />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
