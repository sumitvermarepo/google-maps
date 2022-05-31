/** @format */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { useAddNewLocation, useGetAddresses } from "../../apis/location-api";
import "./header.css";

const google: any = window.google;
var navbarGeocoder = new google.maps.Geocoder(); // initiliaze geocode.

const Header = (props: any) => {
  const { setMapCenter, setZoom } = props;
  const [address, setAddress] = useState<string>("");
  const [fetchAddress, setFetchAddress] = useState<boolean>(false);
  const [openAutoComplete, setOpenAutoComplete] = useState<boolean>(false);

  const addressQuery: any = useGetAddresses(address, fetchAddress);
  const newLocationQuery: any = useAddNewLocation(); // add new location.
  const autoCompleteRef: any = useRef();

  const addresses = useMemo(() => {
    return addressQuery.data;
  }, [addressQuery.data]); // memorize autocomplete addresses.

  const debouncedSearch = debounce(() => {
    setFetchAddress(!fetchAddress);
  }, 700); // make api call using debouncing.

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch();
    setAddress(e.target.value);
  };

  const handleOnBlur = () => setOpenAutoComplete(false);
  const handleOnFocus = () => setOpenAutoComplete(true);

  const handleResp = (locations: { lat: number; lng: number }[]) => {
    if (!!locations && !!locations.length) {
      const location: any = locations[0];
      const center = {
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng(),
      };
      setMapCenter(center);
      setZoom(15);
      handleOnBlur();
      newLocationQuery.mutate(center);
    }
  };

  const handleGetAddress = (address: string) => {
    navbarGeocoder.geocode({ address: address }, handleResp);
    setAddress(address);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target)) {
      handleOnBlur();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="header-container">
      <div className="input-container">
        <h3 className="input-label">Search address:</h3>
        <div ref={autoCompleteRef} className="input-autocomplete-container">
          <input value={address} onChange={handleOnChange} onFocus={handleOnFocus} />
          <div className="suggestion-container">
            {addressQuery.status === "loading" ? (
              <h3>Loading...</h3>
            ) : (
              (addressQuery.status === "success" && !!openAutoComplete && !!addresses.predictions.length) && (
                <div className="suggestion">
                  {addresses.predictions.map(
                    (address: { description: string }, index: number) => {
                      return (
                        <div
                          className="suggestion"
                          key={index}
                          onClick={() => handleGetAddress(address.description)}
                        >
                          {address.description}
                        </div>
                      );
                    }
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
