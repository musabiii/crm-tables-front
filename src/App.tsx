import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Link to='/'>Home</Link>
        <Link to='/clients'>Clients</Link>
        <Link to='/services'>Services</Link>
      </header>
    </div>
  );
}

export default App;
