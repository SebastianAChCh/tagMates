import { StyleSheet, Text, View, Image, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import MapView, { Marker } from 'react-native-maps';
import * as React from 'react';

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Custom: require('../assets/fonts/League.ttf'),
  });

  const [origin, setOrigin] = React.useState({
    latitude: 28.662005864992164,
    longitude: -106.03918117853922,
  });

  const [destination, setDestination] = React.useState({
    latitude: 28.662005864992164,
    longitude: -106.03918117853922,
  });

  return (
    <View style={styles.bg}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          coordinate={origin}
        />

        <Marker
          coordinate={{ latitude: 28.6350, longitude: -106.0720 }}
          title="Amigo 1"
        ><Image source={require('../assets/friend1.png')} style={styles.markerIcon} /></Marker>

        <Marker
          coordinate={{ latitude: 28.6320, longitude: -106.0650 }}
          title="Amigo 2"
        >
          <Image source={require('../assets/friend2.png')} style={styles.markerIcon} />
        </Marker>
      </MapView>


        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Text style={[styles.logoText, { fontFamily: 'LeagueSpartan_800ExtraBold' }]}>TagMates</Text>
            <Image
            source={require('../assets/images/people.png')}
            style={[styles.image, styles.margin]}
            resizeMode="stretch"
          />

          <TouchableOpacity onPress={() => navigation.navigate('Chat')}><Image
            source={require('../assets/images/chat.png')}
            style={[styles.image, styles.margin]}
            resizeMode="stretch"
          /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.barBox}>
        <View>
          <Image
            source={require('../assets/images/arrow.png')}
            style={styles.imgMin}
            resizeMode="stretch"
          />
        </View>

        <View>
          <Image
            source={require('../assets/images/mates.png')}
            style={styles.imgMin}
            resizeMode="stretch"
          />
          <Text style={styles.textMin}>Mates</Text>
        </View>

        <View>
        <TouchableOpacity onPress={() => navigation.navigate('Taggy')}><Image
            source={require('../assets/images/heart.png')}
            style={styles.imgMin}
            resizeMode="stretch"
          /></TouchableOpacity>
          <Text style={styles.textMin}>Taggie</Text>
        </View>

        <View>
        <TouchableOpacity onPress={() => navigation.navigate('Health')}><Image
            source={require('../assets/images/health.png')}
            style={styles.imgMin}
            resizeMode="stretch"
          /></TouchableOpacity>
          <Text style={styles.textMin}>Health</Text>
        </View>

        <View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}><Image
            source={require('../assets/images/settings.png')}
            style={styles.imgMin}
            resizeMode="stretch"
          /></TouchableOpacity>
          <Text style={styles.textMin}>Settings</Text>
        </View>

        <View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}><Image
            source={require('../assets/images/blankProf.png')}
            style={styles.imgMin}
            resizeMode="stretch"
          /></TouchableOpacity>
          <Text style={styles.textMin}>Profile</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#FAF6F6',
    flex: 1,
    fontFamily: 'Custom',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  marker: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#00A19D',
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
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Custom',
    color: '#00ABA1',
    fontSize: 28,
  },

  markerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },


  image: {
    width: 32,
    height: 25,
  },

  imgCont: {
    flexDirection: 'row',
    padding: 0,
    marginRight: 5,
  },

  margin: {
    marginLeft: 20,
    marginTop: 14,
  },

  barBox: {
    backgroundColor: 'white',
    height: 60,
    width: 350,
    padding: 10,
    borderRadius: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 20,
    left: '5%',
    right: '5%',
  },

  logoContainer: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 7,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 5,
    flexDirection: 'row',
  },

  headerContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    marginBottom: 30,
  },

  imgMin: {
    width: 35,
    height: 35,
  },

  textMin: {
    fontSize: 10,
    fontFamily: 'Custom',
    color: 'black',
  },
});
