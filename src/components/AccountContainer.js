import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
//set the component's variables and states//
function AccountContainer() {
  const [transaction, setTransaction] = useState([])
  const [query, setQuery] = useState("")
  // Fetch transactions from the backend API
  useEffect(() => {
    fetch("http://localhost:8001/transactions?q=" + query)
      .then((resp) => resp.json())
      .then(transaction => setTransaction(transaction))
  }, [query])
  ///The event handler function  called when the user types into the search input field.Updates the initial Query State through the setQuary which targets the input term//
  function handleSearch(e) {
    setQuery(e.target.value)
  }
  //The control information flow where the Search component renders the search input field of the parent as prop
  return (
    <div>
      <Search handleSearch={handleSearch} />
      <AddTransactionForm />
      <TransactionsList transactions={transaction} />
    </div>
  );
}

export default AccountContainer;
