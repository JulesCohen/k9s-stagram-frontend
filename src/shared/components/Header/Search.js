import React, { useState, useRef } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autosuggest from "react-autosuggest";
import Avatar from "../UIElements/Avatar";
import "./Search.css";

const Search = () => {
  const [selectedOption, setselectedOption] = useState("user");
  const { sendRequest } = useHttpClient();
  const [value, setvalue] = useState("");
  const [results, setresults] = useState([]);
  const searchRef = useRef();
  let history = useHistory();

  const retrieveData = async (searchText) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/search/${selectedOption}/${searchText}`
      );

      if (selectedOption === "user") {
        setresults(responseData.users);
      } else {
        setresults(responseData.hashtags);
      }
    } catch (error) {}
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
    history.push(
      selectedOption === "user"
        ? `/${suggestion.id}/posts`
        : `/explore/hashtag/${suggestion.slice(1)}`
    );
    setvalue("");
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion.userName;
  };
  const renderSuggestion = (suggestion) => {
    let content;

    if (selectedOption === "user") {
      content = (
        <>
          <Avatar
            size="small"
            img={suggestion.image}
            alt={suggestion.userName}
          />
          <p className="suggestion__author">{suggestion.userName}</p>
        </>
      );
    } else {
      content = <p>{suggestion}</p>;
    }
    return content;
  };

  const focusInput = () => {
    searchRef.current.focus();
  };

  const inputProps = {
    placeholder: `Search..`,
    value,
    onChange: onChange,
    className: "search__input",
    ref: searchRef,
  };

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return <div {...containerProps}>{children}</div>;
  };

  const handleChange = (event) => {
    setselectedOption(event.target.value);
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
        <select name="query" id="query" onChange={handleChange}>
          <option value="user">User</option>
          <option value="hashtags">#</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
