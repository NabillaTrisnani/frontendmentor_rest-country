import React, { useState } from "react";
import Routes from "./Routes";
import Navbar from './layout/Navbar'

function App() {
  const [isActive, setActive] = useState("false");
  localStorage.getItem('theme');
  
  const handleToggle = () => {
    setActive(!isActive);
    if (isActive === true) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
  return (
    <div className={localStorage.getItem('theme') === 'light' ? "App light-theme" : "App dark-theme"}>
      <Navbar
        onClick={handleToggle}
      />
      <Routes />
    </div>
  );
}

export default App;
