import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client'
import { FlatList, Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../providers/Authentication';
import { Message } from '../types/Messages';

const ChatScreen = ({ route }: any) => {

  const [message, setMessage] = useState<string>('');
  const [files, setFiles] = useState<any>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket<any>>();
  const chatRef = useRef<TextInput | null>(null);

  const { INITIAL_URL, userInfo } = useAuth();
  const { email, name } = route.params;

  const loadOldMessages = async () => {
    try {
      const response = await fetch(`${INITIAL_URL}/loadMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userInfo?.email,
          user: email
        })
      });

      const data = await response.json();

      setMessages(data.response);

    } catch (error) {
      console.error(error instanceof Error ? 'Something went wrong ' + error.message : '');
    }
  };

  useEffect(() => {
    const _Socket: Socket = io(`${INITIAL_URL}`);

    setSocket(_Socket);

    _Socket.emit('connected', (userInfo?.email));

    loadOldMessages();

    return () => {
      _Socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('MessageText', (messageInfo: { messageInfo: Message }) => {
        if (messageInfo.messageInfo.receiver !== userInfo?.email) return;
        setMessages(prevItems => [...prevItems, messageInfo.messageInfo]);
      });

      socket.on('MessageFile', (messageInfo: any) => {
      });
    }
  }, [socket]);

  const saveMessage = async (messageInfo: Message, typeUrl: string) => {
    await fetch(`${INITIAL_URL}/${typeUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userInfo?.email, Message: messageInfo })
    });
  }

  const handleSend = () => {
    if (socket && message?.trim()) {
      socket.emit('Message', { message, type: 'text', sender: userInfo?.email, receiver: email });
      setMessages(prevItems => [...prevItems, { message, type: 'text', sender: userInfo!.email, receiver: email }]);
      saveMessage({ message, type: 'text', sender: userInfo!.email, receiver: email }, 'saveTextMessage');
      setMessage('')
      chatRef.current?.focus();
    }

    if (socket && files) {
      socket.emit('Message', { message: files, type: 'file', sender: userInfo?.email, receiver: email });
    }
  };

  function generateUUID(digits = 10) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uuid = [];
    for (let i = 0; i < digits; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join('');
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flexOne}>
        <View style={styles.header}>
          <TouchableOpacity>
            <FontAwesome5 name="chevron-left" size={20} color="#000" />
          </TouchableOpacity>
          <Image source={require('../assets/friend1.png')} style={styles.avatar} />
          <Text style={styles.username}>{name}</Text>
          <Text style={styles.status}>Online</Text>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome5 name="user-friends" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={messages}
          key={generateUUID(10)}
          renderItem={({ item }) => (<View style={styles.messageBox}><Text style={styles.messageText}>{item.message}</Text></View>)}
          style={styles.messageArea}
        />

        <View style={styles.inputContainer}>

          <TouchableOpacity onPress={() => setShowActions(true)}>
            <FontAwesome5 name="plus" size={24} color="#000" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Escribe un mensaje..."
            ref={chatRef}
          />
          <TouchableOpacity onPress={handleSend}>
            <FontAwesome name="send" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showActions}
        onRequestClose={() => setShowActions(false)}
      >

        <TouchableOpacity style={styles.modalBackdrop} onPress={() => setShowActions(false)}>
          <View style={styles.actionsContainer}>

            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="file-photo-o" size={24} color="#000" />
              <Text>Fotos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="camera" size={24} color="#000" />
              <Text>Cámara</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="file" size={24} color="#000" />
              <Text>Documento</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexOne: {
    flex: 1
  },
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

export default ChatScreen;
