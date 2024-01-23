import { useState } from 'react';
import ColorPicker from "./colorPicker";
import s from "./styles.module.css";

const initialColorArray = [0,0,0,0,0]

const ColorPickerHome = () => {
  const [red, setRed] = useState(initialColorArray);
  const [green, setGreen] = useState(initialColorArray);
  const [blue, setBlue] = useState(initialColorArray);

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

  return (
    <div className={s.colorPickerHomeContainer}>
      <h1 className={s.header}>Welcome to Color Picker</h1>
      <div className={s.colorPickerFormContainer}>
      {initialColorArray.map((val, index) => {
        return <ColorPicker 
        red={red[index]} 
        green={green[index]} 
        blue={blue[index]} 
        setRed={generateSetRed(index)} 
        setGreen={generateSetGreen(index)} 
        setBlue={generateSetBlue()}/>
      })}
      </div>
    </div>
  )
}

export default ColorPickerHome