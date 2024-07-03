import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

const Index2 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TagMates</Text>
        <View style={styles.headerIcons}>
          <Icon name="users" size={24} color="#00C6CF" />
          <View style={styles.notificationBadge}>
            <Icon name="bell" size={24} color="#00C6CF" />
            <View style={styles.notificationCount}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </View>
        </View>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.6330,
          longitude: -106.0691,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 28.6350, longitude: -106.0720 }}
          title="Amigo 1"
        >
          <Image source={require('../assets/friend1.png')} style={styles.markerIcon} />
        </Marker>
        <Marker
          coordinate={{ latitude: 28.6320, longitude: -106.0650 }}
          title="Amigo 2"
        >
          <Image source={require('../assets/friend2.png')} style={styles.markerIcon} />
        </Marker>
      </MapView>
      <View style={styles.footer}>
        <Icon name="paper-plane" size={24} color="#00C6CF" />
        <Icon name="handshake-o" size={24} color="#00C6CF" />
        <Icon name="paw" size={24} color="#00C6CF" />
        <Icon name="heartbeat" size={24} color="#00C6CF" />
        <Icon name="cog" size={24} color="#00C6CF" />
        <Icon name="user" size={24} color="#00C6CF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C6CF',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'relative',
    marginLeft: 15,
  },
  notificationCount: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
  },
  map: {
    flex: 1,
  },
  markerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  footer: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Index2;
