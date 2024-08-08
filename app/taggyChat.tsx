import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import Header from '../components/Header';

interface Message {
  id: number;
  text: string;
}

const TaggyScreen = ({ navigation }: { navigation: any }) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket<any>>();
  const { INITIAL_URL, userInfo } = useAuth();

  const sendMessage = () => {
    if (message.trim().length > 0) {
      // const newMessage: Message = { id: Date.now(), text: message };
      // setMessages([...messages, newMessage]);
      if (socket) {
        socket.emit('MessageTaggy', {
          user: 'sebastian',
          sender: 'sebastian',
          receiver: 'chatgpt',
          message: 'me podrias devolver un hola',
          type: 'text',
        });
      }
      setMessage('');
    }
  };

  const loadOldMessages = async () => {
    try {
      const response = await fetch(`${INITIAL_URL}/loadMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo?.email,
        }),
      });

      const data = await response.json();

      setMessages(data.response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const _socket: Socket = io(`${INITIAL_URL}`);

    setSocket(_socket);

    // loadOldMessages();

    _socket.emit('connected', userInfo?.email);

    return () => {
      _socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('ResponseTaggy', (response: any) => {
        console.log(response);
      });
    }
  }, [socket]);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexOne}
      >
        <Header title="Taggy" navigation={navigation} />
        <View style={styles.header}>
          <View style={styles.shadowV}>
            <Image
              source={require('../assets/images/ron.jpeg')}
              style={styles.avatar}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.shadowDiV}
              onPress={() => navigation.navigate('Diary')}
            >
              <Image
                source={require('../assets/images/diary.png')}
                style={styles.diary}
              />
            </TouchableOpacity>
          </View>
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
      <Menu navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  flexOne: {
    flex: 1,
  },

  headerTitle: {
    fontFamily: 'LeagueSpartan_800ExtraBold',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#00A19D',
    marginLeft: 20,
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
    borderColor: 'white',
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
    marginBottom: 90,
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
  },
});

export default TaggyScreen;
