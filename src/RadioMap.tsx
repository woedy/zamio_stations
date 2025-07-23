import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icons in Vite/ESM
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const RadioMap = ({radioStations}) => {
  return (
    <MapContainer
      center={[6.5, -1.5]}
      zoom={6.5}
      scrollWheelZoom={false}
      className="h-full w-full rounded"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {radioStations?.map((station, index) => (
        <Marker
          key={index}
          position={[station.latitude, station.longitude]}
        >
          <Popup>{station.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RadioMap;
