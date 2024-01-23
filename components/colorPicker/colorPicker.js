import { useState } from "react";
import ChosenColorContainer from "./chosenColorContainer";

import s from "./styles.module.css";

const placeholder = "0-255";

const ColorPicker = (props) => {
  const {red, green, blue, setRed, setGreen, setBlue} = props;

  return (
    <div className={s.colorPickerContainer}>
      <ChosenColorContainer red={red} green={green} blue={blue}/>
      <div className={s.rgbContainer}>
        <div className={s.colorContainer}>
          <div className={s.colorLabelRed}>Red</div>
          <input
            className={s.colorInputRed}
            value={red}
            onChange={(ev) => setRed(ev.target.value)}
            placeholder={placeholder}
          />
        </div>
        <div className={s.colorContainer}>
          <div className={s.colorLabelGreen}>Green</div>
          <input
            className={s.colorInputGreen}
            value={green}
            onChange={(ev) => setGreen(ev.target.value)}
            placeholder={placeholder}
          />
        </div>
        <div className={s.colorContainer}>
          <div className={s.colorLabelBlue}>Blue</div>
          <input
            className={s.colorInputBlue}
            value={blue}
            onChange={(ev) => setBlue(ev.target.value)}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
