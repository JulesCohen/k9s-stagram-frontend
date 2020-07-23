import React, { useState, useRef } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { NavLink } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import Avatar from "../UIElements/Avatar";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Search.css";
const Search = () => {
  const { sendRequest } = useHttpClient();
  const [value, setvalue] = useState("");
  const [results, setresults] = useState([]);
  const searchRef = useRef();
  let history = useHistory();

  const retrieveData = async (searchText) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/search/${searchText}`
      );
      console.log(responseData.users);
      setresults(responseData.users);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event, { newValue, method }) => {
    setvalue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    retrieveData(value);
  };

  const onSuggestionsClearRequested = () => {
    setresults([]);
  };

  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    history.push(`/${suggestion.id}/posts`);
    setvalue("");
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion.userName;
  };

  const renderSuggestion = (suggestion) => {
    return (
      <>
        <Avatar size="small" img={suggestion.image} alt={suggestion.userName} />
        <p className="suggestion__author">{suggestion.userName}</p>
      </>
    );
  };

  const focusInput = () => {
    searchRef.current.focus();
  };

  const inputProps = {
    placeholder: "Search for a user..",
    value,
    onChange: onChange,
    className: "search__input",
    ref: searchRef,
  };

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return <div {...containerProps}>{children}</div>;
  };

  return (
    <div className="search">
      <div className="search__content">
        <div className="search__icon" onClick={focusInput}>
          <FontAwesomeIcon icon={["fas", "search"]} />
        </div>

        <Autosuggest
          suggestions={results}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          renderSuggestionsContainer={renderSuggestionsContainer}
          onSuggestionSelected={onSuggestionSelected}
        />
      </div>
    </div>
  );
};

export default Search;
