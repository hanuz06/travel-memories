import { Link } from "react-router-dom";

import "./UserItem.css";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

function UserItem({ image, name, locationCount, id }) {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/locations`}>
          <div className="user-item__image">
            <Avatar image={`http://localhost:5000/${image}`} name={name} width="60px" />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {locationCount} &nbsp;
              {locationCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
