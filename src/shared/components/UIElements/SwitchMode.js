import React, { useState, useEffect } from "react";
import "./SwitchMode.css";

import { Mode, useLightSwitch } from "use-light-switch";

const SwitchMode = () => {
  const mode = useLightSwitch();
  const [darkMode, setDarkMode] = useState(mode === Mode.Dark ? true : false);

  useEffect(() => {
    setDarkMode(mode === Mode.Dark ? true : false);
  }, [mode]);

  const replaceTheme = () => {
    setDarkMode(!darkMode);
    document.getElementById("app").className = darkMode
      ? "light-theme"
      : "dark-theme";
    document.getElementsByTagName("body")[0].style.backgroundColor = darkMode
      ? "rgb(250, 250, 250)"
      : "rgb(34, 34, 34)";
  };

  return (
    <button className={"btn--switchMode"} onClick={replaceTheme}>
      {darkMode ? "LIGHT " : "DARK "} MODE
    </button>
  );
};

export default SwitchMode;
