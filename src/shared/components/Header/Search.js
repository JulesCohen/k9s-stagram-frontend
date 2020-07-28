import React, { useState, useRef, useEffect } from "react";
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
  const [showSelect, setshowSelect] = useState(false);
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
    setshowSelect(true);
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
    // searchRef.current.focus();
    setshowSelect(!showSelect);
  };

  const inputProps = {
    placeholder: `Search by`,
    value,
    onChange: onChange,

    className: "search__input",
    type: "search",
    // ref: searchRef,
  };

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return <div {...containerProps}>{children}</div>;
  };

  const handleChange = (event) => {
    setselectedOption(event.target.value);
    searchRef.current.focus();
  };

  useEffect(() => {
    searchRef.current.focus();
  }, [showSelect]);

  return (
    <div className="search">
      <div className="search__content">
        <div className="search__icon" onClick={focusInput}>
          <FontAwesomeIcon icon={["fas", "search"]} />
        </div>

        <div className="search__inputs" ref={searchRef}>
          <>
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

            <select
              name="query"
              id="query"
              onChange={handleChange}
              className="search__select"
            >
              <option value="user">User</option>
              <option value="hashtags">#</option>
            </select>
          </>
        </div>
      </div>
    </div>
  );
};

export default Search;
