"use client";

import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

interface City {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export default function ParanaMap({ cities }: { cities: City[] }) {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    fetch("/parana.json")
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  return (
    <MapContainer
      center={[-24.5, -51.5]} // Centro aproximado do Paraná
      zoom={6}
      style={{ height: "600px", width: "100%", borderRadius: "16px" }}
      scrollWheelZoom={true}
    >
      {/* Fundo mais clean */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
      />

      {/* GeoJSON do Paraná */}
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={{
            color: "#1d4ed8", // borda azul
            weight: 2,
            fillColor: "#93c5fd", // azul claro dentro
            fillOpacity: 0.4,
          }}
        />
      )}

      {/* Marcadores das cidades */}
      {cities.map((city) => (
        <Marker key={city.id} position={[city.lat, city.lng]}>
          <Popup>
            <strong>{city.name}</strong>
            <br />
            <a href={`/cidades/${city.id}`}>Ver página</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
