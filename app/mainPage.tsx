import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import MapView, { Marker } from 'react-native-maps';
import * as React from 'react';

export default function HomeScreen() {
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
      </MapView>

      <View style={styles.titlebox}>
        <Text style={styles.title}>TagMates</Text>

        <View style={styles.imgCont}>
          <Image
            source={require('../assets/images/people.png')}
            style={styles.image}
            resizeMode="stretch"
          />

          <Image
            source={require('../assets/images/chat.png')}
            style={[styles.image, styles.margin]}
            resizeMode="stretch"
          />
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
          <Image
            source={require('../assets/images/heart.png')}
            style={styles.imgMin}
            resizeMode="stretch"
          />
          <Text style={styles.textMin}>Taggie</Text>
        </View>

        <View>
          <Image
            source={require('../assets/images/health.png')}
            style={styles.imgMin}
            resizeMode="stretch"
          />
          <Text style={styles.textMin}>Health</Text>
        </View>

        <View>
          <Image
            source={require('../assets/images/settings.png')}
            style={styles.imgMin}
            resizeMode="stretch"
          />
          <Text style={styles.textMin}>Settings</Text>
        </View>

        <View>
          <Image
            source={require('../assets/images/blankProf.png')}
            style={styles.imgMin}
            resizeMode="stretch"
          />
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

  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Custom',
    color: '#00ABA1',
    fontSize: 28,
  },

  titlebox: {
    backgroundColor: 'white',
    height: 45,
    width: 380,
    marginTop: 35,
    marginEnd: 60,
    padding: 10,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
