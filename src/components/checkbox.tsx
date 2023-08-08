import Checkbox from 'expo-checkbox';
import Material from '@expo/vector-icons/FontAwesome';
import { Platform } from 'react-native';

const CheckBoxElement = ({styles, isSelected, checkedIcon, uncheckedIcon, size, color }:any) => {
  if (Platform.OS === 'web') {
    return (<Checkbox
      style={styles}
      value={isSelected}
      color={color}
    />);
  }
  return <Material style={styles} name={isSelected  ? checkedIcon : uncheckedIcon} size={size} color={color} />;
}

export default CheckBoxElement;