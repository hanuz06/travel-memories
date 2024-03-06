import { faker } from "@faker-js/faker";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [];

  for (let index = 0; index < 5; index++) {
    USERS.push({
      id: faker.number.hex(65535),
      name: faker.person.fullName(),
      image: faker.image.url(),
      locations: faker.number.int({ min: 1, max: 5 }),
    });
  }
  return <UsersList users={USERS} />;
};

export default Users;
