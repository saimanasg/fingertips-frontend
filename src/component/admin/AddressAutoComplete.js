import React, { useState, useEffect } from "react";

const AddressAutocomplete = ({ updateAddress }) => {
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    let autocomplete;

    const initAutocomplete = () => {
      autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("line1"),
        {
          componentRestrictions: { country: ["us"] },
          fields: ["address_components", "geometry"],
          types: ["address"],
        }
      );
      autocomplete.addListener("place_changed", fillInAddress);
    };

    const fillInAddress = () => {
      const place = autocomplete.getPlace();

      let line1 = "";
      let postcode = "";
      let city = "";
      let state = "";

      for (const component of place.address_components) {
        const componentType = component.types[0];
        switch (componentType) {
          case "postal_code": {
            postcode = `${component.long_name}${postcode}`;
            break;
          }
          case "street_number": {
            line1 = `${component.long_name} ${line1}`;
            break;
          }
          case "route": {
            line1 += component.short_name;
            break;
          }
          case "locality": {
            city = component.long_name;
            break;
          }
          case "administrative_area_level_1": {
            state = component.short_name;
            break;
          }
          default:
            break;
        }
      }

      setAddress({
        ...address,
        line1: line1,
        city: city,
        state: state,
        zip: postcode,
      });

      // Call updateAddress function passed from parent component
      updateAddress({
        line1: line1,
        line2: "", // Add line2 field if needed
        city: city,
        state: state,
        zip: postcode,
      });
    };

    if (window.google) {
      initAutocomplete();
    } else {
      console.error("Google Maps JavaScript API is not loaded.");
    }
  }, [updateAddress]);

  return null; // This component doesn't render anything visible
};

export default AddressAutocomplete;
