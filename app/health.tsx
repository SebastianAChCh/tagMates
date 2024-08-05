import {
  LeagueSpartan_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/league-spartan';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';

const HealthScreen = ({ navigation }: { navigation: any }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
  });

  useEffect(() => {
    (async () => {})();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size={'large'} color={'#00A19D'} />;
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Header title="Health" navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.margin}>
          <View style={styles.box}>
            <Image
              source={require('../assets/images/healthR.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.margin2}>
            <View style={styles.box2}>
              <Image
                source={require('../assets/images/Termometer.png')}
                style={styles.image2}
              />
              <Image
                source={require('../assets/images/bars.png')}
                style={styles.image3}
              />
            </View>

            <View style={styles.box2}>
              <Image
                source={require('../assets/images/oxygen.png')}
                style={styles.image2}
              />
              <Image
                source={require('../assets/images/bars.png')}
                style={styles.image3}
              />
            </View>
          </View>
        </View>
        <Text style={styles.headerTitle}>Resume</Text>

        <Text style={styles.text}>Tus Signos Vitales....</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  margin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  margin2: {
    justifyContent: 'space-between',
  },

  headerTitle: {
    fontFamily: 'LeagueSpartan_800ExtraBold',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#00A19D',
  },

  text: {
    fontFamily: 'LeagueSpartan_800ExtraBold',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },

  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  box: {
    width: 160,
    height: 230,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#00A19D',
    borderWidth: 2,
  },

  box2: {
    width: 160,
    height: 105,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#00A19D',
    borderWidth: 2,
    flexDirection: 'row',
  },

  image: {
    width: 140,
    height: 120,
    position: 'absolute',
    bottom: 0,
    marginBottom: 50,
    marginLeft: 10,
  },

  image2: {
    width: 40,
    height: 50,
    position: 'absolute',
    bottom: 0,
    marginBottom: 22,
    marginLeft: 15,
  },

  image3: {
    width: 80,
    height: 50,
    position: 'absolute',
    bottom: 0,
    marginBottom: 22,
    marginLeft: 55,
  },
});

export default HealthScreen;
