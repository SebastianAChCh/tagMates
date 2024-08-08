import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Marker } from 'react-native-maps';
import { Coordinates } from '../types/Positions';

type Props = {
  navigation: any;
  userIcon: string | ImageSourcePropType;
  Coordinates: Coordinates;
};

const UserMarker = ({ navigation, userIcon, Coordinates }: Props) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('profilePerson')}>
      <Marker
        coordinate={{
          latitude: Coordinates.latitude,
          longitude: Coordinates.longitude,
        }}
        title="Amigo 2"
      >
        {typeof userIcon === 'string' ? (
          <Image source={{ uri: userIcon }} style={styles.markerIcon} />
        ) : (
          <Image source={userIcon} style={styles.markerIcon} />
        )}
      </Marker>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  markerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default UserMarker;
