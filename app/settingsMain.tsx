import { LeagueSpartan_800ExtraBold, useFonts } from '@expo-google-fonts/league-spartan'; 
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsScreen: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text>Cargando...</Text>; 
  }
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerTitle}>Settings</Text>

        <View style={styles.profileSection}>
          <Image source={require('../assets/friend1.png')} style={styles.profilePic} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Johan Butera</Text>
            <Text style={styles.profileDetail}>My profiles, my tags, name</Text>
          </View>
          <Icon name="chevron-right" size={15} color="#000" />
        </View>

        <View style={styles.optionItem}>
          <Icon name="map-marker" size={24} color="red" />
          <Text style={styles.optionText}>Location</Text>
          <Icon name="chevron-right" size={15} color="#000" />
        </View>

        <View style={styles.optionItem}>
          <Icon name="bell" size={24} color="red" />
          <Text style={styles.optionText}>Notifications</Text>
          <Icon name="chevron-right" size={15} color="#000" />
        </View>

        <View style={styles.optionItem}>
          <Icon name="ban" size={24} color="red" />
          <Text style={styles.optionText}>Blocks</Text>
          <Icon name="chevron-right" size={15} color="#000" />
        </View>

        <View style={styles.optionItem}>
          <Icon name="heart" size={24} color="red" />
          <Text style={styles.optionText}>Search Preferences</Text>
          <Icon name="chevron-right" size={15} color="#000" />
        </View>

        <View style={styles.switchContainer}>
          <Icon name="wifi" size={24} color="red" />
          <Text style={styles.optionText}>Proximity Vibration</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
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
