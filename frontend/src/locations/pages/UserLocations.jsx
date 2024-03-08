import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import LocationList from "../components/LocationList";

function UserLocations() {
  const DUMMY_LOCATIONS = [];

  for (let index = 0; index < 5; index++) {
    DUMMY_LOCATIONS.push({
      id: uuidv4(),
      title: faker.word.noun({
        length: 4,
        max: 3,
        min: 1,
      }),
      description: faker.lorem.sentence({ min: 3, max: 5 }),
      imageUrl: faker.image.url({
        width: 80,
        height: 150,
      }),
      address: faker.location.streetAddress(false),
      locations: {
        lat: faker.location.latitude({ max: 10, min: -10 }),
        lng: faker.location.longitude({ max: 10, min: -10 }),
      },
      creator: `u${index + 1}`,
    });
  }

  console.log(DUMMY_LOCATIONS);
  return <LocationList items={DUMMY_LOCATIONS} />;
}

export default UserLocations;
