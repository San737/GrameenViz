// "use client";

// import "../../../../node_modules/leaflet/dist/leaflet.css";
// import {
//   MapContainer,
//   // Marker,
//   // Popup,
//   TileLayer,
//   GeoJSON,
//   //   useMap,
// } from "react-leaflet";
// import L from "leaflet";
// import { BCdata } from "../../../data/india";
// // import features from "../../../data/india.json";
// // import * as BCData from "../../../data/BC_clean.json";

// L.Icon.Default.imagePath = "images/";

// function Map() {
//   function getColor(d: number[]) {
//     if (d === undefined) return "#CCCCCC";
//     return d.map((value) => {
//       return value > 160
//         ? "#800026"
//         : value > 110
//           ? "#BD0026"
//           : value > 70
//             ? "#E31A1C"
//             : value > 40
//               ? "#FC4E2A"
//               : value > 20
//                 ? "#FD8D3C"
//                 : value > 10
//                   ? "#FEB24C"
//                   : value > 5
//                     ? "#FED976"
//                     : "#FFEDA0";
//     });
//   }

//   const mapStyle = {
//     // fillColor: getColor(inData.features.map((e) => e.properties.Total_BCs)),
//     // fillColor: BCdata.features.forEach((e) => getColor(e.properties.Total_BCs)) as string,
//     // fillColor: getColor(BCdata.features.map((e) => e.properties.Total_BCs)),
//     fillColor: "green",
//     weight: 1,
//     color: "black",
//     colorOpacity: 0.5,
//     fillOpacity: 0.2,
//   };

//   return (
//     <MapContainer
//       className="z-0 mx-auto mt-12 h-96 max-w-4xl "
//       center={[22.306615059722038, 78.30791160996145]}
//       zoom={5}
//       scrollWheelZoom={true}
//       attributionControl={false}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       <GeoJSON style={mapStyle} data={BCdata} />
//       {/* <Marker position={[51.505, -0.09]}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker> */}
//     </MapContainer>
//   );
// }

// export default Map;
