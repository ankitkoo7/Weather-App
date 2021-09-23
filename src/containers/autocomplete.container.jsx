import { Fragment, useEffect, useRef, useState } from "react";
import { messageError } from "../libs/clientMessages/clientMessages";
import Search from "../components/search.component";
import { getAutoCompleteSugesstions } from "../utils/getWeatherData";
const AutocompleteContainer = (props) => {
  const { onLocationChange = (text) => {} } = props;
  const [isCancelled, setisCancelled] = useState(false); 
  const [textValue, setTextValue] = useState(""); 
  const [cities, setCities] = useState([]); 
  const [suggestions, setSuggestions] = useState([]);
  const [focusSuggestion, setFocusSuggestion] = useState(-1);

  useEffect(() => {
    setisCancelled(false);
    const loadUsers = async () => {
      try {
        if (textValue.length) {
          const suggestionsCollection = await getAutoCompleteSugesstions(
            textValue
          );
          if (suggestionsCollection) {
            setCities(suggestionsCollection);
          }
        } else {
          return;
        }
      } catch (err) {
        messageError("Sorry, something wrong with input autocomplete");
        setisCancelled(true);
      }
    };

    // If an error occurs while receiving data from the server,
    // then we no longer make a request to the server
    if (!isCancelled) {
      _clearFocusSuggestion();
      _clearSuggestion(textValue);
      loadUsers();
    }
  }, [textValue]);

  const _clearFocusSuggestion = () => {
    if (focusSuggestion !== -1) {
      setFocusSuggestion(-1);
    }
  };

  const _clearSuggestion = (textValue) => {
    if (!textValue.length && suggestions.length) {
      setSuggestions([]);
    }
  };

  const _cityNameLayout = (suggestion) => {
    const countyName = suggestion.name || "";

    return `${countyName}`;
  };

  const handleChangeValue = (event) => {
    setTextValue(event.target.value);
    setSuggestions(cities);
  };

  const handleSuggestClick = (event) => {
    setTextValue(event.target.innerText);
    setSuggestions([]);
  };

  const handleClearField = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
  };

  const handleKeyCatcher = (event) => {
    if (
      (event.key === "ArrowUp" || event.code === "ArrowUp") &&
      focusSuggestion > -1
    ) {
      setFocusSuggestion(focusSuggestion - 1);
    }

    const maxSuggest = suggestions.length - 1;
    if (
      (event.key === "ArrowDown" || event.code === "ArrowDown") &&
      focusSuggestion !== maxSuggest
    ) {
      setFocusSuggestion(focusSuggestion + 1);
    }

    if (
      (event.key === "Enter" || event.code === " Enter") &&
      focusSuggestion !== -1
    ) {
      setTextValue(_cityNameLayout(suggestions[focusSuggestion]));
      handleClearField();
    }
  };

  const handleClickButton = () => {
    onLocationChange(textValue);
    _clearFocusSuggestion();
    handleClearField();
    setTextValue("");
  };

  const _mapSuggestion = (suggestion, index) => {
    return (
      <li
        className={
          "search__autocomplete-item " +
          (focusSuggestion === index ? "search__autocomplete-item--color" : "")
        }
        key={suggestion.locationId}
      >
        {_cityNameLayout(suggestion)}
      </li>
    );
  };

  return (
    <Fragment>
      <Search
        onChangeValue={handleChangeValue}
        onClearField={handleClearField}
        onKeyCatcher={handleKeyCatcher}
        onClickButton={handleClickButton}
        textValue={textValue}
      >
        {suggestions.length ? (
          <ul className="search__autocomplete" onClick={handleSuggestClick}>
            {suggestions.map(_mapSuggestion)}
          </ul>
        ) : null}
      </Search>
    </Fragment>
  );
};

export default AutocompleteContainer;
