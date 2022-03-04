import React, { useState } from "react";
import Routes from "./Routes";
import Navbar from './layout/Navbar'

function App() {
  const [isActive, setActive] = useState("false");
  const [theme, setTheme] = useState('');

  const handleToggle = () => {
    setActive(!isActive);
    if (isActive === true) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    };
    handleTheme()
  };

  const handleTheme = () => {
    var currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }
  return (
    <div className={theme === 'light' ? "App light-theme" : "App dark-theme"}>
      <Navbar
        theme={handleToggle}
      />
      <Routes />
    </div>
  );
}

export default App;
