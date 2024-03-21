"use client";

import "../../../../node_modules/leaflet/dist/leaflet.css";
import {
  MapContainer,
  // Marker,
  // Popup,
  TileLayer,
  GeoJSON,
  //   useMap,
} from "react-leaflet";
import L from "leaflet";
import * as inData from "../../../data/india.json";
// import features from "../../../data/india.json";
// import * as BCData from "../../../data/BC_clean.json";

L.Icon.Default.imagePath = "images/";

function Map() {
  function getColor(d: number) {
    if (d === undefined) return "#CCCCCC";
    return d > 160
      ? "#800026"
      : d > 110
        ? "#BD0026"
        : d > 70
          ? "#E31A1C"
          : d > 40
            ? "#FC4E2A"
            : d > 20
              ? "#FD8D3C"
              : d > 10
                ? "#FEB24C"
                : d > 5
                  ? "#FED976"
                  : "#FFEDA0";
  }

  const mapStyle = {
    // fillColor: getColor(inData.features.map((e) => e.properties.Total_BCs)),
    fillColor: getColor(inData.features.properties?.Total_BCs),
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };

  return (
    <MapContainer
      className="z-0 mx-auto mt-12 h-96 max-w-4xl "
      center={[22.306615059722038, 78.30791160996145]}
      zoom={5}
      scrollWheelZoom={true}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON style={mapStyle} data={inData.features} />

      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
}

export default Map;
