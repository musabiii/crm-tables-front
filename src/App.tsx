import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="main-header">
          Tables
        </div>
        <main className="main">
          <Link to="/clients">Clients</Link>
          <Link to="/services">Services</Link>
          <Link to="/documents">Documents</Link>
        </main>
      </header>
    </div>
  );
}

export default App;
