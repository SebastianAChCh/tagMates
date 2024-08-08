import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Modal,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Header from '../components/Header';
import {
  LeagueSpartan_400Regular,
  LeagueSpartan_600SemiBold,
  LeagueSpartan_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/league-spartan';
import Menu from '../components/Menu'




export default function DiaryScreen({ navigation }: { navigation: any }) {
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

  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_400Regular,
  });

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Header title="Diary" navigation={navigation} />
      <View style={styles.container}>
        

        <View style={styles.boxB}>
          <TouchableOpacity style={styles.selector} onPress={toggleModal}>
          <Text style={styles.textM}>{selectedMate}</Text>
        </TouchableOpacity>

        <View style={styles.saveButton}>
          <TouchableOpacity >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        </View>
        </View>

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
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => selectMate(item)}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={toggleModal}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ScrollView horizontal={true} contentContainerStyle={styles.scroll}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.imageContainer}>
        
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.image}
          />
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.image}
          />
          <View style={styles.addImage}>
            <Text style={styles.addImageText}>+</Text>
          </View>
          
        </View>
        </ScrollView>

        <Text style={styles.ratText}>Rating</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <Text
                style={[styles.star, rating >= star ? styles.filledStar : null]}
              >
                ●
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Describe your experience"
          value={experience}
          onChangeText={setExperience}
        />

{Platform.OS !== 'android' ? (
  <View style={styles.emojiContaineriOS}>
  {['😍', '😔', '😴', '🤣', '😡'].map((emoji, index) => (
    <TouchableOpacity key={index}>
      <Text style={styles.emoji}>{emoji}</Text>
    </TouchableOpacity>
  ))}
</View>
       
      ) : (
        <View style={styles.emojiContainerAnd}>
          {['😍', '😔', '😴', '🤣', '😡'].map((emoji, index) => (
            <TouchableOpacity key={index}>
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

        
      </View>

      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginHorizontal: 18,
  },

  scroll: {
    height: 190
  },

  textM: {
    fontSize: 18,
    fontFamily: 'LeagueSpartan_400Regular'
  },

  boxB: {
    backgroundColor: "F4F4F4",
    borderRadius: 90,
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  title: {
    fontFamily: 'LeagueSpartan_800ExtraBold',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#00A19D',
    marginLeft: 20,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  selector: {
    backgroundColor: "F4F4F4"
    
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    
  },
  image: {
    width: 125,
    height: 190,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: '#00A19D',
  },
  addImage: {
    width: 120,
    height: 190,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#00A19D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 36,
    color: '#ccc',
  },

  ratText: {
    fontSize: 30,
    fontFamily: 'LeagueSpartan_600SemiBold',
    left: 20,

  },

  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: 15
    
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
  emojiContaineriOS: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 190,
    backgroundColor: "#F4F4F4",
    borderRadius: 100,
    height: 65,
    alignItems: 'center'
  },

  emojiContainerAnd: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 110,
    backgroundColor: "#F4F4F4",
    borderRadius: 100,
    height: 65,
    alignItems: 'center'
  },

  emoji: {
    fontSize: 43,
  },
  saveButton: {
    backgroundColor: '#00A19D',
    borderRadius: 24,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    height: 40,
    width: 90
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    top: '35%'
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
