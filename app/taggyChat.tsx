import { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as React from 'react';
import Header from '../components/Header';

interface Message {
  id: number;
  text: string;
}

const TaggyScreen = ( { navigation } : {navigation : any}) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);

  const sendMessage = () => {
    if (message.trim().length > 0) {
      const newMessage: Message = { id: Date.now(), text: message };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flexOne}>
      <Header title='Taggy' navigation={navigation}/>
        <View style={styles.header}>
          <View style={styles.shadowV}><Image source={require('../assets/images/ron.jpeg')} style={styles.avatar}/></View>
            <View >
              <TouchableOpacity style={styles.shadowDiV} onPress={() => navigation.navigate('Diary')}>
                <Image source={require('../assets/images/diary.png')} style={styles.diary} />
              </TouchableOpacity>
            </View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <View style={styles.messageBox}><Text style={styles.messageText}>{item.text}</Text></View>}
          style={styles.messageArea}
        />

        <View style={styles.inputContainer}>
        
            
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Escribe un mensaje..."
          />
          <TouchableOpacity onPress={sendMessage}>
            <Icon name="send" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
  flexOne: {
    flex: 1
  },

  headerTitle: {
    fontFamily: 'LeagueSpartan_800ExtraBold', 
    fontSize: 35, 
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#00A19D',
    marginLeft: 20
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginHorizontal: 10,
    elevation: 50,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 4,
  },

  shadowV: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: 'white',
    borderRadius: 90,
  },

  shadowDiV: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: 'white',
    borderRadius: 100,
    zIndex: 2,
    bottom: 40,
    left: 52,
    
  },

  diary: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white'

    
  },
  username: {
    fontWeight: 'bold',
  },
  status: {
    color: 'green',
  },
  icon: {
    padding: 10,
  },
  messageArea: {
    flex: 1,
    padding: 10,
  },
  messageBox: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    marginRight: 10,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  actionsContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  }
});

export default TaggyScreen;
