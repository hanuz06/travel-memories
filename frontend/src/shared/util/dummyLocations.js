import { faker } from "@faker-js/faker";

// const dummyLocations = () => {
//   const DUMMY_LOCATIONS = [];

//   for (let index = 0; index < 5; index++) {
//     DUMMY_LOCATIONS.push({
//       id: `p${index + 1}`,
//       title: faker.word.noun({
//         length: 4,
//         max: 3,
//         min: 1,
//       }),
//       description: faker.lorem.sentence({ min: 3, max: 5 }),
//       imageUrl: faker.image.url({
//         width: 80,
//         height: 150,
//       }),
//       address: faker.location.streetAddress(false),
//       coordinates: {
//         lat: 40.694217019239424,
//         lng: -73.96678137675303,
//       },
//       // locations: {
//       //   lat: faker.location.latitude({ max: 10, min: -10 }),
//       //   lng: faker.location.longitude({ max: 10, min: -10 }),
//       // },
//       creator: `u${index + 1}`,
//     });
//   }

//   return DUMMY_LOCATIONS;
// };

const DUMMY_LOCATIONS = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

export default DUMMY_LOCATIONS;
