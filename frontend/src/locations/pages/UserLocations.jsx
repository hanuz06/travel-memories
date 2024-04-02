import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LocationList from "../components/LocationList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { useHttpClient } from "../../shared/hooks/http-hook";

function UserLocations() {
  const [loadedLocations, setLoadedLocations] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const responseDate = await sendRequest(`${import.meta.env.VITE_APP_BACKEND}/locations/user/${userId}`);
        setLoadedLocations(responseDate.locations);
      } catch (err) {}
    };
    fetchLocations();
  }, [sendRequest, userId]);

  const locationDeleteHandler = async (deletedLocationId) => {
    setLoadedLocations((prevLocations) => prevLocations.filter((location) => location.id !== deletedLocationId));
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedLocations && (
        <LocationList items={loadedLocations} onDeleteLocation={locationDeleteHandler} />
      )}
    </>
  );
}

export default UserLocations;
