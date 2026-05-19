import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const FALLBACK_CENTER = [22.7196, 75.8577];

const getPosition = (donor) => {
  let lat = donor?.location?.latitude;
  let lng = donor?.location?.longitude;

  if (typeof lat === "string") {
    lat = Number(lat);
  }

  if (typeof lng === "string") {
    lng = Number(lng);
  }

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return [lat, lng];
};

const DonorMap = ({ donors = [] }) => {
  const donorsWithLocation = donors
    .map((donor) => ({
      donor,
      position: getPosition(donor),
    }))
    .filter((item) => item.position);

  const center = donorsWithLocation[0]?.position || FALLBACK_CENTER;
  const bounds = donorsWithLocation.map(({ position }) => position);

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
      <MapContainer
        bounds={bounds.length ? bounds : undefined}
        center={center}
        zoom={11}
        className="h-[320px] sm:h-[360px] w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {donorsWithLocation.map(({ donor, position }) => (
          <Marker key={donor._id} position={position}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <div className="text-sm font-semibold">
                {donor.fullName} • {donor.bloodGroup}
              </div>
            </Tooltip>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{donor.fullName}</p>
                <p>{donor.bloodGroup} donor</p>
                <p>{donor.city || donor.location?.city || "Location not set"}</p>
                <p>{donor.phone}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DonorMap;
