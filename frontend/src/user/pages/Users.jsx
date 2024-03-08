import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

import UsersList from "../components/UsersList";

function Users() {
  const USERS = [];

  for (let index = 0; index < 5; index++) {
    USERS.push({
      id: uuidv4(),
      name: faker.person.fullName(),
      image: faker.image.url({
        width: 50,
        height: 50,
      }),
      locations: faker.number.int({ min: 1, max: 5 }),
    });
  }
  console.log(USERS);
  return <UsersList users={USERS} />;
}

export default Users;
