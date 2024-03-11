import { faker } from "@faker-js/faker";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LocationList from "../components/LocationList";
import DUMMY_LOCATIONS from "../../shared/util/dummyLocations";

function UserLocations() {

  const userId = useParams().userId;

  const loadedLocations = DUMMY_LOCATIONS.filter((location) => location.creator === userId);

  return <LocationList items={loadedLocations} />;
}

export default UserLocations;
