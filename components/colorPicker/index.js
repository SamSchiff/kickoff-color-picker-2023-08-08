import { useState } from "react";
import ChosenColorContainer from "./chosenColorContainer";

import s from "./styles.module.css";

const placeholder = "0-255";

const ColorPicker = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const conditionallySetNumber = (str, setColor) => {
    if (str === "") return setColor(str)
    const num = parseInt(str);
    if (!isNaN(num) && num >= 0 && num <= 255) {
      setColor(num)
    }
  }

  const setRedNumber = (input) => {
    conditionallySetNumber(input, setRed)
  }
  const setGreenNumber = (input) => {
    conditionallySetNumber(input, setGreen)
  }
  const setBlueNumber = (input) => {
    conditionallySetNumber(input, setBlue)
  }

  return (
    <div className={s.colorPickerContainer}>
      <h1 className={s.header}>Welcome to Color Picker</h1>
      <ChosenColorContainer red={red} green={green} blue={blue}/>
      <div className={s.rgbContainer}>
        <div className={s.colorContainer}>
          <div className={s.colorLabelRed}>Red</div>
          <input
            className={s.colorInputRed}
            value={red}
            onChange={(ev) => setRedNumber(ev.target.value)}
            placeholder={placeholder}
          />
        </div>
        <div className={s.colorContainer}>
          <div className={s.colorLabelGreen}>Green</div>
          <input
            className={s.colorInputGreen}
            value={green}
            onChange={(ev) => setGreenNumber(ev.target.value)}
            placeholder={placeholder}
          />
        </div>
        <div className={s.colorContainer}>
          <div className={s.colorLabelBlue}>Blue</div>
          <input
            className={s.colorInputBlue}
            value={blue}
            onChange={(ev) => setBlueNumber(ev.target.value)}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
