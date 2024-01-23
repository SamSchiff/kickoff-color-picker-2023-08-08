import { useState, useEffect } from 'react';
import s from "./styles.module.css";
import axios from 'axios';
import PalettePicker from './palettePicker';

const initialColorArray = [0,0,0,0,0]

const ColorPickerHome = () => {
  const [palettes, setPalettes] = useState([]);

  const fetchPalettes = async () => {
    const { status, data } = await axios.get("/api/palette");

    if (status === 200) {
      setPalettes(data);
    } else {
      throw new Error("Error connecting to server");
    }
  };

  useEffect(() => {
    fetchPalettes();
  }, [setPalettes, axios]);

  const savePaletteCallback = () => {
    fetchPalettes()
    alert("Successful!")
  }

  const parseColorString = (colorString) => {
    return colorString.split(",")
  }

  return (
    <div className={s.colorPickerHomeContainer}>
      <h1 className={s.header}>Welcome to Color Picker</h1>
      <PalettePicker initialRed={initialColorArray} initialGreen={initialColorArray} initialBlue={initialColorArray} savePaletteCallback={savePaletteCallback}/>
      <h2 className={s.savedPalettesHeader}>Saved Palettes</h2>
      {
        palettes.map((palette) => {
          const initialRed = [];
          const initialGreen = [];
          const initialBlue = [];
          initialColorArray.forEach((val, index) => {
            const key = `color${index}`; 
            const colors = parseColorString(palette[key])
            initialRed.push(colors[0])
            initialGreen.push(colors[1])
            initialBlue.push(colors[2])
          })
          return (
            <div className={s.savedPaletteContainer} key={palette.id}>
              <PalettePicker initialRed={initialRed} initialGreen={initialGreen} initialBlue={initialBlue} savePaletteCallback={savePaletteCallback} paletteId={palette.id}/> 
            </div>
          )
        })
      }
    </div>
  )
}

export default ColorPickerHome