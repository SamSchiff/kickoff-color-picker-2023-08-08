import { useState, useEffect } from 'react';
import ColorPicker from "./colorPicker";
import s from "./styles.module.css";
import axios from 'axios';

const initialColorArray = [0,0,0,0,0]

const PalettePicker = (props) => {
  const { initialRed, initialGreen, initialBlue, savePaletteCallback, paletteId } = props;
  const [red, setRed] = useState(initialRed);
  const [green, setGreen] = useState(initialGreen);
  const [blue, setBlue] = useState(initialBlue);

  const conditionallySetNumber = (str, setColor, index) => {
    if (str === "") {
      setColor((prevColors) => {
        const newColors = [...prevColors]
        newColors[index] = str
        return newColors
      })
    }
    const num = parseInt(str);
    if (!isNaN(num) && num >= 0 && num <= 255) {
      setColor((prevColors) => {
        const newColors = [...prevColors]
        newColors[index] = num
        return newColors
      })
    }
  }

  const generateSetRed = (index) => {
    return (newColor) => {
      conditionallySetNumber(newColor, setRed, index);
    }
  }
  const generateSetGreen = (index) => {
    return (newColor) => {
      conditionallySetNumber(newColor, setGreen, index);
    }
  }
  const generateSetBlue = (index) => {
    return (newColor) => {
      conditionallySetNumber(newColor, setBlue, index);
    }
  }
  const generateColorString = (red, green, blue) => {
    return `${red},${green},${blue}`
  }

  const savePalette = async () => {
    const newPalette = red.reduce((prevValue, redValue, index) => {
      const key = `color${index}`;
      prevValue[key] = generateColorString(red[index], green[index], blue[index]);
      return prevValue
    }, {})

    await axios.post("/api/palette", newPalette);

    setRed(initialColorArray)
    setGreen(initialColorArray)
    setBlue(initialColorArray)
    savePaletteCallback()
  }

  const updatePalette = async () => {
    const newPalette = red.reduce((prevValue, redValue, index) => {
      const key = `color${index}`;
      prevValue[key] = generateColorString(red[index], green[index], blue[index]);
      return prevValue
    }, {})
    newPalette.id = paletteId;
    await axios.put("/api/palette", newPalette);
    savePaletteCallback()
  }

  const deletePalette = async () => {
    await axios.delete(`/api/palette`, {data: {id: paletteId}});
    savePaletteCallback();
  }

  return (
    <div className={s.colorPickerHomeContainer}>
      <div className={s.colorPickerFormContainer}>
      {initialColorArray.map((val, index) => {
        return <ColorPicker 
        key={index}
        red={red[index]} 
        green={green[index]} 
        blue={blue[index]} 
        setRed={generateSetRed(index)} 
        setGreen={generateSetGreen(index)} 
        setBlue={generateSetBlue(index)}/>
      })}
      </div>
      <div className={s.actionButtons}>
        <button className={s.button} onClick={paletteId ? updatePalette : savePalette}>
          {paletteId ? "Update" : "Save" }
        </button>
        {paletteId && (
          <button className={s.button} onClick={deletePalette}>Delete</button>
        )}
      </div>
    </div>
  )
}

export default PalettePicker