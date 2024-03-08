import Card from "../../shared/components/UIElements/Card";
import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = ({ users }) => {
  if (!users?.length) {
    return (
      <div className="center">
        <Card>
          <h2>No users found!</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {users?.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            image={user.image}
            locationCount={user.locations}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
