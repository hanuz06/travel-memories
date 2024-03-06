const UserItem = ({ image, name, locationCount }) => {
  return (
    <li className='user-item'>
      <div className='user-item__content'>
        <div className='user-item__image'>
          <img src={image} alt={name} />
        </div>
        <div className='user-item__info'>
          <h2>{name}</h2>
          <h3>
            {locationCount} {locationCount === 1 ? "Place" : "Places"}
          </h3>
        </div>
      </div>
    </li>
  );
};

export default UserItem;
