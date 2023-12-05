import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionId, setTransactionId] = useState(null);
///fetching and displyaing the trascations from the Public API//
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);
///FUNCTION  handle the deletion of transactions when transactionId changes by calling the handleDeleteTransaction function./// 
  useEffect(() => {
    if (transactionId) {
      handleDeleteTransaction(transactionId);
    }
  }, [transactionId]);
////filters transactions based on the provided search term typed and sets the filtered transactions using setFilteredTransactions//
  
function handleSearch(term){
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };
///Function Sorting transactions alphabetically by category or description to be triggered by buttons on click//

  const handleSort = (property) => {
    const sortedTransactions = [...filteredTransactions];
    sortedTransactions.sort((a, b) => {
      const valueA = a[property].toLowerCase();
      const valueB = b[property].toLowerCase();

      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    });

    setFilteredTransactions(sortedTransactions);
  };
///// Set transactionId to trigger the deletion///
  function handleDelete(transactionId){
    setTransactionId(transactionId);
  };
///Function  THAT sends a DELETE request to the server to delete the specified transaction&resets transactionId after deletion //

  const handleDeleteTransaction = (transactionId) => {
    fetch(`http://localhost:8001/transactions/${transactionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Do nothing here; let the useEffect handle the update
        } else {
          console.error("Error deleting transaction:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting transaction:", error))
      .finally(() => {
        setTransactionId(null); // Reset transactionId after deletion attempt
      });
  };
////// Add a new transaction to the list////
  function handleAddTransaction(newTransaction){
    setTransactions([...transactions, newTransaction]);
    handleSearch('');
  };

  return (
    <div>
    <Search onSearch={handleSearch} />
    <button onClick={() => handleSort("category")}>Sort by Category</button>
    <button onClick={() => handleSort("description")}>Sort by Description</button>
    <AddTransactionForm handleAddTransaction={handleAddTransaction} />
    <TransactionsList transactions={filteredTransactions} handleDelete={handleDelete} />
  </div>
);
}


export default AccountContainer;
