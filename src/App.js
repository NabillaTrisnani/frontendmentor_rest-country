import React, { useState } from "react";
import Routes from "./Routes";
import Navbar from './layout/Navbar'

function App() {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
    if (isActive === true) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }
  return (
    <div className={localStorage.getItem('theme') === 'light' ? "App light-theme" : "App dark-theme"}>
      <Navbar
        theme={handleToggle}
      />
      <Routes />
    </div>
  );
}

export default App;
