import React, { useState } from 'react';
import { View, Text, FlatList, Image, Modal, Platform, StatusBar, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../components/Header';

export default function DiaryScreen({ navigation } : {navigation : any}) {
  const [rating, setRating] = useState(0);
  const [experience, setExperience] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMate, setSelectedMate] = useState('Choose your mate');
  
  const mate = ['Elia Muñoz', 'SebastianAntonio', 'Dafnis', 'Ronroney'];

  const handleRating = (value) => {
    setRating(value);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectMate = (mate) => {
    setSelectedMate(mate);
    toggleModal();
  };

  return (

  <SafeAreaView style={styles.AndroidSafeArea}>
    <View style={styles.container}>
    <Header title='Diary' navigation={navigation} />
      
      <TouchableOpacity style={styles.selector} onPress={toggleModal}>
        <Text>{selectedMate}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={mate}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectMate(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} />
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} />
        <View style={styles.addImage}>
          <Text style={styles.addImageText}>+</Text>
        </View>
      </View>
      
      <Text>Califcacion</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Text style={[styles.star, rating >= star ? styles.filledStar : null]}>●</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Describe your experience"
        value={experience}
        onChangeText={setExperience}
      />

      <View style={styles.emojiContainer}>
        {['😍', '😔', '😴', '🤣', '😡'].map((emoji, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>

</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'LeagueSpartan_800ExtraBold', 
    fontSize: 35, 
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#00A19D',
    marginLeft: 20
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  selector: {
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#00A19D'
  },
  addImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00A19D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 36,
    color: '#ccc',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    left: '14%'
  },
  star: {
    fontSize: 32,
    color: '#ccc',
  },
  filledStar: {
    color: '#00A19D',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 32,
  },
  saveButton: {
    backgroundColor: '#00A19D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '00A19D',
  },
  modalContent: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',

  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalCloseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#00A19D',
    borderRadius: 10,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
