import React, { useState, useEffect } from "react";

let cache = new Map();

function AutoComplete() {
  const [results, searchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchResuls = async () => {
    let results = await fetch(`https://api.datamuse.com/sug?s=${inputValue}`);
    let data = await results.json();
    return data;
  };

  useEffect(() => {
    if (!inputValue) {
      searchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      if (cache.has(inputValue)) {
        searchResults(cache.get(inputValue));
      } else {
        let data = await fetchResuls();
        searchResults(data);
        cache.set(inputValue, data);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <div className="auto-complete-container">
      <p>Google Search</p>
      <div>
        <input
          placeholder="search"
          className="search-input"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <ul className="search-results">
        {results.map((eachValue, index) => {
          return (
            <li key={index}>
              <p>{eachValue?.word}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AutoComplete;
