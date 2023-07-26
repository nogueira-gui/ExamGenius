import { CheckBox } from "react-native-elements";


const CheckBoxElement = ({checkboxStyle, value, checkedIcon, uncheckedIcon, checkedColor, uncheckedColor }) => {

return (<CheckBox
  containerStyle={checkboxStyle}
  checked={value}
  disabled={true}
  checkedIcon={checkedIcon}
  uncheckedIcon={uncheckedIcon}
  checkedColor={checkedColor}
  uncheckedColor={uncheckedColor}
/>);
}

export default CheckBoxElement;