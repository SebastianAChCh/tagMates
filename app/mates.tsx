import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import { useAuth } from '../providers/Authentication';
import { io, Socket } from 'socket.io-client';
import { UsersModel } from '../../tagMatesBackEnd/src/types/Users';

const MatesScreen = ({ navigation }: { navigation: any }) => {
  const { INITIAL_URL, userInfo, generateUUID } = useAuth();
  const [socket, setSocket] = useState<Socket<any>>();
  const [requests, setRequests] = useState([
    {
      id: '1',
      email: 'EliaMuñoz@gmail.com',
      name: 'Elia Muñoz',
      image: '../assets/images/diary.png',
      matchPercentage: '70%',
    },
    {
      id: '2',
      email: 'JuanButera@gmail.com',
      name: 'Juan Butera',
      image: '../assets/images/chat.png',
      matchPercentage: '50%',
    },
  ]);

  useEffect(() => {
    const _Socket: Socket = io(`${INITIAL_URL}`);

    setSocket(_Socket);

    _Socket.emit('connected', userInfo?.email);

    return () => {
      _Socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('RequestUser', (data: { sender: string; receiver: string }) => {
        let dataUser: UsersModel | null = null;
        (async () => {
          try {
            const response = await fetch(`${INITIAL_URL}/getInformationUser`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: data.sender,
              }),
            });

            dataUser = await response.json();
          } catch (error) {
            console.error(error);
          }
        })();

        setRequests([
          ...requests,
          {
            id: generateUUID ? generateUUID(10) : '',
            email: data.sender,
            name: dataUser!.fullname ? dataUser!.fullname : '',
            image: '../assets/images/chat.png',
            matchPercentage: '100%',
          },
        ]);
      });
    }
  }, [socket]);

  const confirmRequest = async (id: any) => {
    const userInf = requests.map((users) =>
      users.id === id ? users.name : ''
    );

    try {
      await fetch(`${INITIAL_URL}/saveContact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo?.email,
          user: userInf,
        }),
      });

      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequest = (id: any) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
  };

  const renderRequestItem = ({ item }: { item: any }) => (
    <View style={styles.requestContainer}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.matchPercentage}>{item.matchPercentage}</Text>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => confirmRequest(item.id)}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteRequest(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Header title="Zaps" navigation={navigation} />
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
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
