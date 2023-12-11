import React from "react";
///The child component the Search,Taking a prop handlesearch as a callback function to handle changes in the search input value from its Parent the AccountCointainer //
///The onChange event of the input attribute, is connected to the handleSearch function, allowing the parent component to be notified of any changes in the search input value//
function Search({handleSearch}) {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={handleSearch}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
