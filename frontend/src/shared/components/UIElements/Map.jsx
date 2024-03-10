import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import "./Map.css";

const Map = ({ className, style, center, zoom }) => {
  const libraries = ["places"];
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) { 
    return <div>Loading maps</div>;
  }

  return (
    <div className={`map ${className} ${style}`}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={center}>
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;
