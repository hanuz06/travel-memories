import "./LocationList.css";

import Card from "../../shared/components/UIElements/Card";
import LocationItem from "./LocationItem";
import Button from "../../shared/components/FormElements/Button";

function LocationList({ items, onDeleteLocation }) {
  if (!items?.length) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No locations found. Create a new one.</h2>
          <Button to="/locations/new">Share Location</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map((location) => (
        <LocationItem
          key={location.id}
          id={location.id}
          image={location.image}
          title={location.title}
          description={location.description}
          address={location.address}
          creatorId={location.creator}
          coordinates={location.coordinates}
          onDelete={onDeleteLocation}
        />
      ))}
    </ul>
  );
}

export default LocationList;
