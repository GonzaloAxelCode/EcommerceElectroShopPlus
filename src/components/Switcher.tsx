import React, { useState } from "react";
//@ts-ignore
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../hooks/useDarkSide";
const Switcher = () => {
  const { colorTheme, setTheme } = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === "light");

  const toggleDarkMode = (checked: any) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div className="m-1 flex flex-col items-center">
        <DarkModeSwitch
          checked={darkSide}
          onChange={toggleDarkMode}
          size={26}
        />
      </div>
    </>
  );
};

export default Switcher;
