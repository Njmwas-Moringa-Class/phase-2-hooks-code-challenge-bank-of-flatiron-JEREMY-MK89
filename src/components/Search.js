import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(event) {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Pass the updated value directly
  }

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={handleChange}
      />
      <i className="circular search link icon"></i>
    </div>
  );
};

export default Search;
