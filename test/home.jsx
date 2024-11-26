import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [balance, setBalance] = useState(12500.45);
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Shopping', amount: -50.25, date: '2024-09-15' },
    { id: 2, description: 'Salary', amount: 2500.00, date: '2024-09-12' },
    { id: 3, description: 'Electric Bill', amount: -100.00, date: '2024-09-10' },
  ]);

  const handleDeposit = () => {
    const amount = parseFloat(prompt("Enter amount to deposit:"));
    if (!isNaN(amount)) {
      setBalance(balance + amount);
      addTransaction('Deposit', amount);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(prompt("Enter amount to withdraw:"));
    if (!isNaN(amount) && amount <= balance) {
      setBalance(balance - amount);
      addTransaction('Withdraw', -amount);
    } else {
      alert("Insufficient balance or invalid amount");
    }
  };

  const addTransaction = (description, amount) => {
    const newTransaction = {
      id: transactions.length + 1,
      description,
      amount,
      date: new Date().toISOString().slice(0, 10)
    };
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="App">
      <Navbar />
      <Header balance={balance} />
      <QuickActions onDeposit={handleDeposit} onWithdraw={handleWithdraw} />
      <TransactionHistory transactions={transactions} />
    </div>
  );
};

const Navbar = () => (
  <nav className="navbar">
    <h1>Banking App</h1>
    <ul>
      <li>Home</li>
      <li>Accounts</li>
      <li>Transfer</li>
      <li>Support</li>
      <li>Logout</li>
    </ul>
  </nav>
);

const Header = ({ balance }) => (
  <header className="header">
    <h2>Welcome, User!</h2>
    <div className="balance-container">
      <p>Account Balance:</p>
      <h3>${balance.toFixed(2)}</h3>
    </div>
  </header>
);

const QuickActions = ({ onDeposit, onWithdraw }) => (
  <section className="quick-actions">
    <h2>Quick Actions</h2>
    <button onClick={onDeposit}>Deposit</button>
    <button onClick={onWithdraw}>Withdraw</button>
  </section>
);

const TransactionHistory = ({ transactions }) => (
  <section className="transaction-history">
    <h2>Recent Transactions</h2>
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <div>{transaction.description}</div>
          <div>{transaction.date}</div>
          <div>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}</div>
        </li>
      ))}
    </ul>
  </section>
);

export default App;
