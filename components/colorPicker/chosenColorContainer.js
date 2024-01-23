import s from "./styles.module.css";

const ChosenColorContainer = (props) => {
const {red, green, blue} = props;
  return (
    <div className={s.chosenColorContainer}>
     <div className={s.chosenColor} style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}}/>
    </div>
  )

}

export default ChosenColorContainer