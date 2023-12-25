// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// interface MapProps {
//   center: [number, number];
//   zoom: number;
// }

// const Map: React.FC<MapProps> = ({ center, zoom }) => {
//   return (
//     <MapContainer center={center} zoom={zoom} style={{ width: '100%', height: '400px' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={center}>
//         <Popup>Your Location</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default Map;
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const Map = () => {
  return (
    <MapContainer center={[40.8054,-74.0241]} zoom={14} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
      <Marker 
      position={[40.8054,-74.0241]}
      draggable={true}
      // animate={true}
      >
        <Popup>
          Hey ! you found me
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map