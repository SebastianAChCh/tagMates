import { LeagueSpartan_400Regular, LeagueSpartan_600SemiBold, LeagueSpartan_800ExtraBold, useFonts } from '@expo-google-fonts/league-spartan';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../providers/Authentication';
import { Contact } from '../types/Contacts';

const ChatScreen = ({ navigation }: { navigation: any }) => {
  const { INITIAL_URL, userInfo, generateUUID } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>();
  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_400Regular,
  });

  const loadContacts = async () => {
    try {
      const response = await fetch(`${INITIAL_URL}/loadContacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userInfo?.email
        })
      });

      const data = await response.json();

      if (typeof data.response !== 'string') {
        setContacts(data.contactsLoaded);
      }


    } catch (error) {
      console.error(error instanceof Error && error.message);
    }
  }

  useEffect(() => {
    loadContacts()
  }, []);


  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Cargando...</Text></View>;
  }

  const renderItem = ({ email, name, MessageInf }: Contact) => {

    return (
      <TouchableOpacity
        style={styles.chatItem}
        key={generateUUID && generateUUID(10)}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('ChatWithPerson', {
          email,
          name
        })}
      >
        <Image source={require('../assets/friend1.png')} style={styles.image} />
        <View style={styles.chatInfo}>
          <View style={styles.chatNameAndTime}>
            <Text style={[styles.chatName, { fontFamily: 'LeagueSpartan_600SemiBold' }]}>{name ? name : ''}</Text>
            <Text style={[styles.chatTime, { fontFamily: 'LeagueSpartan_400Regular' }]}>{MessageInf?.date ? MessageInf?.date : ''}</Text>
          </View>
          <Text style={[styles.chatMessage, { fontFamily: 'LeagueSpartan_400Regular' }]}>{MessageInf?.message ? MessageInf.message : ''}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.header}>
        <Text style={[styles.title, { fontFamily: 'LeagueSpartan_800ExtraBold' }]}>Chats</Text>
        <Icon name="user-friends" size={24} color="#000" />
      </View>
      <ScrollView>
        {
          contacts ? contacts.map(renderItem) : (<Text>Loading...</Text>)
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 35,
    color: '#00A19D',
    marginBottom: 16,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
  },
  chatNameAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatMessage: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
  chatTime: {
    fontSize: 14,
    color: 'gray',
  },
  listContentContainer: {
    paddingBottom: 10,
  }
});

export default ChatScreen;
