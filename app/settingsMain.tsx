import { LeagueSpartan_800ExtraBold, useFonts } from '@expo-google-fonts/league-spartan';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View, Platform, StatusBar } from 'react-native';
import SettingIcon from '../components/SettingIcon';
import { useAuth } from '../providers/Authentication';
import Header from '../components/Header';

const SettingsScreen = ({ navigation } : {navigation : any}) => {
  const { getProximityState, INITIAL_URL, userInfo } = useAuth();
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
  }
  useMemo(() => executeGetProximityState(), []);

  useEffect(() => {
    if (typeof isEnabled === 'boolean') {
      handleProximityState();
    }
  }, [isEnabled]);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }

  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
  });

  const handleProximityState = async () => {
    try {
      await fetch(`${INITIAL_URL}/changeProximityState`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userInfo?.email,
          state: isEnabled
        })
      });

    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  if (!fontsLoaded) {
    return <Text>Cargando...</Text>;
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView style={styles.scrollView}>
      <Header title='Settings' navigation={navigation}/>

        <SettingIcon icon='chevron-right' route='Location' src={require('../assets/images/location.png')} />

        <SettingIcon icon='chevron-right' route='Notifications' src={require('../assets/images/notification.png')} />

        <SettingIcon icon='chevron-right' route='Blocks' src={require('../assets/images/block.png')} />

        <SettingIcon icon='chevron-right' route='Search Preferences' src={require('../assets/images/heart.png')} />

        <View style={styles.switchContainer}>
          <Image source={require('../assets/images/proximity.png')}
            style={styles.image} />
          <Text style={styles.optionText}>Proximity Vibration</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#00A19D" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    marginHorizontal: 20,
  },

  image: {
    height: 35,
    width: 35,
    borderRadius: 5
  },
  headerTitle: {
    fontFamily: 'LeagueSpartan_800ExtraBold',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#00A19D'
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10
  },
  profileInfo: {
    flex: 1
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  profileDetail: {
    fontSize: 12,
    color: '#666'
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10
  },

  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});

export default SettingsScreen;
