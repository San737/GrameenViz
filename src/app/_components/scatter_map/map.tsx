"use client";

import "../../../../node_modules/leaflet/dist/leaflet.css";
import {
  MapContainer,
  //  Marker,
  // Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
// import * as BCData from "../../../data/BC_with_cord.json";
import ShowBC from "./markerCluster";

L.Icon.Default.imagePath = "images/";
// const newIcon = new L.Icon({
//   iconSize: new L.Point(10, 26),
// });

export type mapType = {
  SNo: number;
  NameOfBC: string;
  ContactNumber: number;
  Gender: string;
  BankName: string;
  State: string;
  District: string;
  OfficeName: string;
  Pincode: number;
  CorporateBCName: string;
  Latitude: number;
  Longitude: number;
};

function Map() {
  return (
    <MapContainer
      className="z-0 mx-auto mt-12 h-80 max-w-4xl "
      center={[22.306615059722038, 78.30791160996145]}
      zoom={5}
      scrollWheelZoom={true}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ShowBC />
      {/* {BCData.map((e) => (
        <Marker key={e.SNo} position={[e.Latitude ?? 0, e.Longitude ?? 0]}>
          <Popup>{e.State}</Popup>
        </Marker>
      ))} */}
    </MapContainer>
  );
}

export default Map;
