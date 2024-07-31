import { View, Text, StyleSheet, Image, Platform, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useState } from 'react';
import { useAuth } from '../providers/Authentication';
import Menu from '../components/Menu';
import Header from '../components/Header';
import { LeagueSpartan_400Regular, LeagueSpartan_600SemiBold, LeagueSpartan_800ExtraBold, useFonts } from '@expo-google-fonts/league-spartan';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { userInfo } = useAuth();

  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_400Regular,
  });

  const [origin, setOrigin] = useState({
    latitude: 28.662005864992164,
    longitude: -106.03918117853922,
  });

  const [destination, setDestination] = useState({
    latitude: 28.662005864992164,
    longitude: -106.03918117853922,
  });
  return (

    <SafeAreaView style={styles.bg}>
     
     {Platform.OS !== "web" ? (
      <MapView
        style={styles.map}
        
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }
        }

      
      >
        <Marker coordinate={origin} />

        <TouchableOpacity onPress={() => navigation.navigate('profilePerson')}>
          <Marker
            coordinate={{ latitude: 28.635, longitude: -106.072 }}
            title="Amigo 1"
          >
            <Image
              source={require('../assets/friend1.png')}
              style={styles.markerIcon}
            />
          </Marker>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('profilePerson')}>
          <Marker
            coordinate={{ latitude: 28.632, longitude: -106.065 }}
            title="Amigo 2"
          >
            <Image
              source={require('../assets/friend2.png')}
              style={styles.markerIcon}
            />
          </Marker>
        </TouchableOpacity>
      </MapView>
      ) : <></>}
      <Header navigation={navigation} title='TagMates' />

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
