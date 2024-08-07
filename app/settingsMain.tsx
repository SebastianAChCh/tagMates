import {
  LeagueSpartan_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/league-spartan';
import React, { useEffect, useMemo, useState } from 'react';
<<<<<<< HEAD
import { Image, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View, Platform, StatusBar } from 'react-native';
=======
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
>>>>>>> 543f863353f76b3571ba1c35d55434a92539412f
import SettingIcon from '../components/SettingIcon';
import { useAuth } from '../providers/Authentication';
import Header from '../components/Header';
import Menu from '../components/Menu';

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const { getProximityState, INITIAL_URL, userInfo, logOut } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);

  const executeGetProximityState = async () => {
    if (getProximityState) {
      const stateProximity = await getProximityState();
      if (typeof stateProximity === 'boolean') {
        setIsEnabled(stateProximity);
      } else {
        console.error(stateProximity);
      }
    }
  };
  useMemo(() => executeGetProximityState(), []);

  useEffect(() => {
    if (typeof isEnabled === 'boolean') {
      handleProximityState();
    }
  }, [isEnabled]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
  });

  const handleProximityState = async () => {
    try {
      await fetch(`${INITIAL_URL}/changeProximityState`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo?.email,
          state: isEnabled,
        }),
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  if (!fontsLoaded) {
    return <Text>Cargando...</Text>;
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
<<<<<<< HEAD
      
      <Header title='Settings' navigation={navigation}/>
      <ScrollView style={styles.scrollView}>
      

=======
      <Header title="Settings" navigation={navigation} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
>>>>>>> 543f863353f76b3571ba1c35d55434a92539412f
        <View style={styles.boxG}>
          <SettingIcon
            handleClick={() => {}}
            icon="chevron-right"
            route="Location"
            src={require('../assets/images/location.png')}
          />
          <View style={styles.line} />

          <SettingIcon
            handleClick={() => {}}
            icon="chevron-right"
            route="Notifications"
            src={require('../assets/images/notification.png')}
          />
          <View style={styles.line} />

          <SettingIcon
            handleClick={() => {}}
            icon="chevron-right"
            route="Blocks"
            src={require('../assets/images/block.png')}
          />
        </View>

        <View style={styles.boxG2}>
          <SettingIcon
            handleClick={() => {}}
            icon="chevron-right"
            route="Search Preferences"
            src={require('../assets/images/heart.png')}
          />
          <View style={styles.line} />

          <View style={styles.switchContainer}>
            <Image
              source={require('../assets/images/proximity.png')}
              style={styles.image}
            />
            <Text style={styles.optionText}>Proximity Vibration</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#00A19D' }}
              thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <View style={styles.boxG3}>
          <SettingIcon
            handleClick={() => {
              (async () => {
                await fetch(`${INITIAL_URL}/deleteUser`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: userInfo?.email,
                  }),
                });

                if (logOut) {
                  logOut();
                }
              })();
            }}
            icon="chevron-right"
            route="Delete Account"
            src={require('../assets/images/deleteAcc.png')}
          />
          <View style={styles.line} />

          <SettingIcon
            handleClick={() => {
              if (logOut) {
                logOut();
              }
            }}
            icon="chevron-right"
            route="Log Out"
            src={require('../assets/images/cerrarSes.png')}
          />
          <View style={styles.line} />

          <SettingIcon
            handleClick={() => {}}
            icon="chevron-right"
            route="Terms and Privacy"
            src={require('../assets/images/terms.png')}
          />
        </View>
      </ScrollView>
<<<<<<< HEAD

      <Menu navigation={navigation} />
      
=======
      <Menu navigation={navigation} />
>>>>>>> 543f863353f76b3571ba1c35d55434a92539412f
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    flexGrow: 1,
  },

  image: {
    height: 32,
    width: 32,
    borderRadius: 5,
  },

  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10,
    padding: 15,
  },

  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  boxG: {
    borderColor: '#B2AEB1',
    borderWidth: 0.5,
    borderRadius: 15,
  },

  boxG2: {
    borderColor: '#B2AEB1',
    borderWidth: 0.5,
    borderRadius: 15,
    top: 20,
  },

  boxG3: {
    borderColor: '#B2AEB1',
    borderWidth: 0.5,
    borderRadius: 15,
    top: 40,
  },

  line: {
    height: 0.5,
    backgroundColor: '#B2AEB1',
    width: '85%',
    left: 58,
  },
});

export default SettingsScreen;
