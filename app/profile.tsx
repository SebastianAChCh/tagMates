import { Image, ScrollView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LeagueSpartan_400Regular, LeagueSpartan_600SemiBold, LeagueSpartan_800ExtraBold, useFonts } from '@expo-google-fonts/league-spartan';
import { useEffect, useState } from 'react';
import { useAuth } from '../providers/Authentication';
import { UsersTp } from '../types/Users';
import Header from '../components/Header';
import AddButton from '../components/AddButton';

export default function ProfileScreen({ router, navigation }: { router: any, navigation: any }) {
  const [infoUser, setInfoUser] = useState<UsersTp>();
  const { INITIAL_URL, userInfo } = useAuth();
  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_400Regular,
  });

  const getDataProfile = async () => {
    try {
      const response = await fetch(`${INITIAL_URL}/getInformationUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userInfo?.email
        })
      });

      const data = await response.json();

      if (typeof data !== 'string') {
        setInfoUser(data.information);
      }

    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }

  }

  useEffect(() => {
    getDataProfile();
  }, []);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {
        !infoUser ? (
          <View><Text>Loading...</Text></View>
        ) : (
          <>
          <ScrollView style={styles.scrollView}>
          <Header title='Profile' navigation={navigation} />

              <View style={styles.header}>
                <View style={styles.shadowV}><Image source={require('../assets/friend1.png')} style={styles.avatar} /></View>
                <Text style={styles.nameTitle}>{infoUser.fullname}</Text>
              </View>

              <View>
                <Text style={styles.text1}>Description</Text>
                <View style={styles.box}>
                  <Text style={styles.text2}>{!infoUser.summary ? 'There is no summary yet' : infoUser.summary}</Text>
                </View>

                <Text style={styles.text1}>My Tags</Text>
                <View style={styles.box}>
                  {!infoUser.tags ? (<>
                    <Text style={styles.text2}>There are not tags yet</Text>
                    <View style={styles.addTabButton}>
                      <AddButton />
                    </View>
                  </>) :
                    infoUser.tags?.map(tag => {
                      return (<>
                        <View style={styles.tabButton}><Text style={styles.tabButtonText}>Fortnite</Text></View>
                        <View style={styles.tabButton}><Text style={styles.tabButtonText}>Fortnite</Text></View>
                        <View style={styles.tabButton}><Text style={styles.tabButtonText}>Fortnite</Text></View></>
                      );
                    })}
                </View>

                <Text style={styles.text1}>My Photos</Text>
                <ScrollView horizontal={true}>
                  <View style={styles.marginPh}>
                    <View style={styles.box2}></View>
                    <View style={styles.box2}></View>
                    <View style={styles.box2}></View>
                  </View>
                </ScrollView>

              </View>

            </ScrollView></>
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#FFFFFF',
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

  text1: {
    fontFamily: 'LeagueSpartan_800ExtraBold',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    marginLeft: 20
  },

  text2: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 15,
    marginBottom: 5,
    marginTop: 5,
    color: 'black',
    marginLeft: 10,
    marginRight: 10
  },

  scrollView: {
    zIndex: 999999
  },

  marginPh: {
    flexDirection: 'row',
    
  },


  box: {
    width: '90%',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#00A19D',
    borderWidth: 0.5,
    marginLeft: 20,
    marginRight: 20
  },

  box2: {
    width: 140,
    height: 180,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#00A19D',
    borderWidth: 0.5,
    marginLeft: 20,
    marginRight: 0
  },


  nameTitle: {
    fontFamily: 'LeagueSpartan_800ExtraBold',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 4,
    marginTop: 0,
  
  },
  shadowV: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: 'white',
    borderRadius: 100
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
  },

  tabButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    maxWidth: 100,
    flexWrap: 'wrap',
    flexShrink: 1,
  },

  tabButtonText: {
    fontSize: 16,
    fontFamily: 'LeagueSpartan_400Regular',
    left: 3,
    textAlign: "center"
  },

  addTabButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexShrink: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '80%'
  },

  addTabButtonText: {
    fontSize: 25,
    fontFamily: 'LeagueSpartan_400Regular',
    left: 3,
    textAlign: "center"
  },
});
