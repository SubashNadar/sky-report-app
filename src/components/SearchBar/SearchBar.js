import { useState, useEffect, useRef, useCallback } from "react";
import {
  AccurateWeather_API_KEY,
  Cities_Auto_Recommendation_API,
} from "../../api/config";
import "./SearchBar.css";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-search search-icon"
    viewBox="0 0 16 16"
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
  </svg>
);

const ClearIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-x-circle clear-icon"
    viewBox="0 0 16 16"
    onClick={onClick}
  >
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
  </svg>
);

const LoadingSpinner = () => <div className="loading-spinner"></div>;

const SearchBar = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [code, setCode] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchContainerRef = useRef(null);

  const fetchCities = useCallback(
    async (searchText, signal) => {
      setSuggestions([]);
      if (searchText.length < 2) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${Cities_Auto_Recommendation_API}/autocomplete?apikey=${AccurateWeather_API_KEY}&q=${query}`
        );
        const d = await response.json();
        console.log(d);
        const citySuggestions = d.map((city) => ({
          id: city.key,
          name: `${city.LocalizedName}, ${city.Country.ID}`,
          value: city.LocalizedName,
          code: city.Country.ID,
        }));
        setSuggestions(citySuggestions);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [query]
  );

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchCities(query, controller.signal);
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, fetchCities]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (city) => {
    setSuggestions([]);
    setQuery(city.value);
    setCode(city.code);
    setError(null);
    onCitySelect(city.value, city.code);
  };

  const handleClear = () => {
    setShowSuggestions(true);
    setQuery("");
    setCode("");
    setSuggestions([]);
    setError("");
    onCitySelect("", "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onCitySelect(query.trim(), code.trim());
    }
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
      <p style={{ textAlign: "center", color: "#666", fontSize: " 0.9em" }}>
        Enter a city to get a detailed 5-day forecast.
      </p>
      <form
        className="search-bar-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="input-wrapper">
          <SearchIcon />
          <input
            type="text"
            className="search-input"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => {
              setShowSuggestions(true);
              setQuery(e.target.value);
              if (e.target.value.length === 0) {
                onCitySelect("", "");
              }
            }}
          />
          {isLoading && <LoadingSpinner />}
          {!isLoading && query && <ClearIcon onClick={handleClear} />}
        </div>
      </form>

      {!query.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            class="location-btn"
            onClick={() => {
              setQuery("Hyderabad");
              onCitySelect("Hyderabad", "IN");
            }}
          >
            <span>
              {isLoading ? "📍Fetching Location..." : "📍Use Current Location"}
            </span>
          </button>
        </div>
      )}
      {suggestions.length > 0 && showSuggestions && (
        <ul className="suggestions-list">
          {suggestions.map((city) => (
            <li
              key={city.id}
              onClick={() => {
                setShowSuggestions(false);
                setSuggestions([]);
                handleSuggestionClick(city);
              }}
              className="suggestion-item"
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}

      {query && error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SearchBar;
