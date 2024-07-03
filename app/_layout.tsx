import React, { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Message {
  id: number;
  text: string;
}

const ChatScreen: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    if (message.trim().length > 0) {
      const newMessage: Message = { id: Date.now(), text: message };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="chevron-left" size={20} color="#000" />
          </TouchableOpacity>
          <Image source={require('../assets/friend1.png')} style={styles.avatar} />
          <Text style={styles.username}>Elia Muñoz</Text>
          <Text style={styles.status}>Online</Text>
          <TouchableOpacity style={styles.icon}>
            <Icon name="user-friends" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          style={styles.messageArea}
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Icon name="plus" size={24} color="#000" />
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  username: {
    flex: 1,
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
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    marginRight: 10,
  },
});

export default ChatScreen;
