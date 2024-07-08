import { LeagueSpartan_400Regular, LeagueSpartan_600SemiBold, LeagueSpartan_800ExtraBold, useFonts } from '@expo-google-fonts/league-spartan';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type ChatItemProps = {
    item: {
        imageUrl: any,  // Usamos 'any' porque la fuente es variable y local
        name: string,
        message: string,
        time: string,
    };
};

const ChatScreen = () => {
  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_400Regular,
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Cargando...</Text></View>;
  }

  const chats = [
    { id: '1', name: 'Elia Muñoz', message: 'Usted está reprobado', time: '2:57 p.m.', imageUrl: require('../assets/friend1.png') },
    { id: '2', name: 'Dafnis Villagrán', message: 'Esto está muy candente chavo', time: '1:37 p.m.', imageUrl: require('../assets/friend2.png') },
    { id: '3', name: 'Nuvia González', message: 'Envía un mensaje a tu nuevo mate', time: '2:57 p.m.', imageUrl: require('../assets/friend1.png') },
  ];

  const renderItem = ({ item }: ChatItemProps) => (
    <TouchableOpacity
      style={styles.chatItem}
      activeOpacity={0.6}
      onPress={() => console.log('Chat presionado')}
    >
      <Image source={item.imageUrl} style={styles.image} />
      <View style={styles.chatInfo}>
        <View style={styles.chatNameAndTime}>
          <Text style={[styles.chatName, { fontFamily: 'LeagueSpartan_600SemiBold' }]}>{item.name}</Text>
          <Text style={[styles.chatTime, { fontFamily: 'LeagueSpartan_400Regular' }]}>{item.time}</Text>
        </View>
        <Text style={[styles.chatMessage, { fontFamily: 'LeagueSpartan_400Regular' }]}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.header}>
        <Text style={[styles.title, { fontFamily: 'LeagueSpartan_800ExtraBold' }]}>Chats</Text>
        <Icon name="user-friends" size={24} color="#000" />
      </View>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
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
