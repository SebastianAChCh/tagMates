import React, { useState } from 'react';
import { SafeAreaView, Platform, StatusBar, View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import Menu from '../components/Menu'

const MatesScreen = ({navigation}: {navigation: any}) => {
  const [requests, setRequests] = useState([
    { id: '1', name: 'Elia Muñoz', image: '../assets/images/diary.png', matchPercentage: '70%' },
    { id: '2', name: 'Juan Butera', image: '../assets/images/chat.png', matchPercentage: '50%' },
  ]);

  const confirmRequest = (id: any) => {
    console.log(`Confirmando solicitud con id: ${id}`);
  };

  const deleteRequest = (id: any) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };

  const renderRequestItem = ({ item }: { item: any }) => (
    <View style={styles.requestContainer}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.matchPercentage}>{item.matchPercentage}</Text>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={() => confirmRequest(item.id)}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRequest(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Header title='Zaps' navigation={navigation} />
      <View style={styles.container}>
      
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Suggestions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>My mates</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Zap Requests</Text>
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={renderRequestItem}
        />
      </View>
      <Menu navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'LeagueSpartan_800ExtraBold',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00A19D',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  tabButtonText: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchPercentage: {
    fontSize: 14,
    color: '#00A19D',
  },
  confirmButton: {
    backgroundColor: '#00A19D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  confirmButtonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#000',
  },
});

export default MatesScreen;
