import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = ({ users }) => {
  if (!users?.length) {
    return (
      <div className='center'>
        <h2>No users found!</h2>
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
            image={user.image}
            locationCount={user.locations}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
