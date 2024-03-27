// src/components/Footer/footer.jsx
import React, { useState } from 'react';
import { searchItems } from '../../utilities/search-api';

export default function Footer() {
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    try {
      const response = await searchItems(query);
      if (response.items.length > 0) {
        setSearchResults(response.items);
        setErrorMessage('');
      } else {
        setSearchResults([]);
        setErrorMessage('No Search Results! Please Try Again');
      }
    } catch (error) {
      console.error('Error searching items:', error);
      setErrorMessage('Internal Server Error');
    }
  };

  return (
    <>
      <form className="d-flex" onSubmit={handleSearch}>
        <input className="form-control me-2" type="search" name="query" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-secondary" type="submit">Search</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      <ul>
        {searchResults.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>

      <footer className="py-3 my-4">
          <p className="text-center text-body-secondary pb-3 mb-3">© 2024 Book Store, Inc</p>
      </footer>
    </>
  );
}
