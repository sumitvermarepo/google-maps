/** @format */

import React, { useEffect } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import {
  useAddNewLocation,
  useGetSearchedLocation,
  useUpdateLocationStatus,
} from "../../apis/location-api";

const MAP_STYLE = {
  width: "100%",
  height: "100%",
};

const icons = {
  green: "http://labs.google.com/ridefinder/images/mm_20_green.png",
  red: "http://labs.google.com/ridefinder/images/mm_20_red.png",
  blue: "http://labs.google.com/ridefinder/images/mm_20_blue.png",
  grey: "http://labs.google.com/ridefinder/images/mm_20_yellow.png",
};

const GoogleMap = ({ google, center, zoom }: any) => {
  const [clicks, setClicks] = React.useState<any[]>([]);

  const searchedLocationQuery = useGetSearchedLocation(); // get all searched locations
  const newLocationQuery: any = useAddNewLocation(); // add new location
  const updateLocationQuery: any = useUpdateLocationStatus(); // update location status

  useEffect(() => {
    if (searchedLocationQuery.status === "success") {
      setClicks([...clicks, ...searchedLocationQuery.data]);
    }
  }, [searchedLocationQuery.data]);

  const handleMapClicked = (button: any, map: any, latLngEvent: any) => {
    setClicks([...clicks, { latlng: latLngEvent.latLng, color: "grey" }]);
    newLocationQuery.mutate(latLngEvent.latLng); // add new location in db.
  };

  const onMarkerClick = (id: string) => {
    id && updateLocationQuery.mutate(id); // mutate new status of location in db.
  };

  return (
    // @ts-ignore
    <Map
      google={google}
      containerStyle={{
        ...MAP_STYLE,
      }}
      style={MAP_STYLE}
      center={center}
      initialCenter={center}
      zoom={zoom}
      disableDefaultUI={true}
      onClick={handleMapClicked}
    >
      {clicks.map((coords: any, index: any) => {
        return (
          <Marker
            icon={{
              url: icons[coords.color as keyof typeof icons],
              size: new google.maps.Size(20, 36),
              scaledSize: new google.maps.Size(20, 36),
              anchor: new google.maps.Point(10, 50),
            }}
            key={index}
            position={coords.latlng}
            onClick={() => onMarkerClick(coords._id)}
          />
        );
      })}
    </Map>
  );
};

const LoadingContainer = (props: any) => <div>Loading Map...</div>;

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
  language: "en",
  LoadingContainer: LoadingContainer,
})(GoogleMap);
