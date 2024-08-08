import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingIcon = ({
  src,
  route,
  icon,
  handleClick,
}: {
  src: ImageSourcePropType;
  route: string;
  icon: string;
  handleClick: any;
}) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={styles.optionItem}>
        <Image source={src} style={styles.image} />
        <Text style={styles.optionText}>{route}</Text>
        <Icon name={icon} size={15} color="#B2AEB1" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 32,
    width: 32,
    borderRadius: 7,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    padding: 15,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SettingIcon;
