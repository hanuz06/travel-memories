import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className='center'>
        <h2>No users found!</h2>
      </div>
    );
  }
  return (
    <ul>
      {items?.map((user) => {
        return <UserItem key={user.id} id={user.id} image={user.image} />;
      })}
    </ul>
  );
};

export default UsersList;
