import "./LocationList.css";

import Card from "../../shared/components/UIElements/Card";
import LocationItem from "./LocationItem";

const LocationList = ({ items }) => {
  if (!items?.length) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No locations found. Create a new one.</h2>
          <button>Share Location</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='place-list'>
      {items.map((location) => (
        <LocationItem
          key={location.id}
          id={location.id}
          image={location.imageUrl}
          title={location.title}
          description={location.description}
          address={location.address}
          creatorId={location.creator}
          coordinates={location.coordinates}
        />
      ))}
    </ul>
  );
};

export default LocationList;
