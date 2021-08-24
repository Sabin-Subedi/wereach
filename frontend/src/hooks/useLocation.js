
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";

function useLocation(props) {
  const [location, setLocation] = useState("");

 
  useEffect(() => {
    Geocode.setApiKey("AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw");
    Geocode.setLanguage("en");
    navigator.geolocation.getCurrentPosition(
      function(position) {
        Geocode.fromLatLng(position.coords.latitude,position.coords.longitude).then(response => {
          const add = response.results[0].formatted_address.split(',')
          setLocation(add[add.length-1])
        }).catch(error => {
          console.Log(error)
        })
      },
      function(error) {
        console.error("Error Code  " + error.code + " - " + error.message);
      }
    );



  }, [props]);

  return {location};
}

export default useLocation;
