import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "./Autocomplete.css";

const Autocomplete = (props) => {
  const [address, setaddress] = useState("");
  const [input, setinput] = useState("");

  const handleChange = (address) => {
    setinput(address);
    setaddress(address);
    props.onSelect(address);
  };

  const handleSelect = (address) => {
    setinput(address);
    props.onSelect(address);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="form__input">
          <label htmlFor={"location"}>Location</label>
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
            })}
            value={input}
            name="location"
          />
          {props.error && `Location is required`}
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const style = suggestion.active
                ? {
                    backgroundColor: "tomato",
                    cursor: "pointer",
                    color: "white",
                  }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  className="input-suggestion"
                  {...getSuggestionItemProps(suggestion, {
                    style,
                  })}
                >
                  <i className="material-icons">location_on </i>{" "}
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default Autocomplete;
