import {
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { useAuth } from '../providers/Authentication';
import Menu from '../components/Menu';
import Header from '../components/Header';
import {
  LeagueSpartan_400Regular,
  LeagueSpartan_600SemiBold,
  LeagueSpartan_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/league-spartan';
import { io, Socket } from 'socket.io-client';
import { UsersModel } from '../../tagMatesBackEnd/src/types/Users';
import UserMarker from '../components/UserMarker';
import { Coordinates } from '../types/Positions';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { userInfo, INITIAL_URL } = useAuth();
  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_400Regular,
  });

  const [socket, setSocket] = useState<Socket<any>>();

  const [origin, setOrigin] = useState<Coordinates>({
    latitude: 28.662005864992164,
    longitude: -106.03918117853922,
  });

  const [destination, setDestination] = useState<UsersModel[]>([]);

  useEffect(() => {
    const SocketIo: Socket = io(`${INITIAL_URL}`);

    setSocket(SocketIo);

    SocketIo.emit('connected', userInfo?.email);

    return () => {
      SocketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('positionUser', (user: UsersModel) => {
        const userExist = destination.some(
          (users) => users.email === user.email
        );
        if (userExist) {
          setDestination(
            destination.map((users) =>
              users.email === user.email
                ? { ...users, coordinates: user.coordinates }
                : users
            )
          );
        } else {
          setDestination((newUser) => [...newUser, user]);
        }
      });

      socket.on('currentUserPosition', (user: UsersModel) => {
        if (user.coordinates) setOrigin(user.coordinates);
      });
    }
  }, [socket]);

  return (
    <SafeAreaView style={styles.bg}>
      {Platform.OS !== 'web' ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
        >
          <Marker coordinate={origin} />
          <FlatList
            data={destination}
            renderItem={({ item }) => (
              <UserMarker
                userIcon={
                  item.avatar_path
                    ? item.avatar_path
                    : require('../assets/friend2.png')
                }
                navigation={navigation}
                Coordinates={
                  item.coordinates
                    ? item.coordinates
                    : { latitude: 0, longitude: 0 }
                }
              />
            )}
          />
        </MapView>
      ) : (
        <></>
      )}
      <Header navigation={navigation} title="TagMates" />

      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#FAF6F6',
    flex: 1,
    fontFamily: 'LeagueSpartan_400Regular',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  marker: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  markerImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  markerText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },

  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'LeagueSpartan_800ExtraBold',
    color: '#00ABA1',
    fontSize: 28,
  },

  markerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  imgCont: {
    flexDirection: 'row',
    padding: 0,
    marginRight: 5,
  },
});
