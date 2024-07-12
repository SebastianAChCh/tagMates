
import { Image, ScrollView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { LeagueSpartan_800ExtraBold } from '@expo-google-fonts/league-spartan'

export default function ProfileScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
      LeagueSpartan_800ExtraBold,
    });
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView style={styles.scrollView}>
      <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.header}>
          <Image source={require('../assets/friend1.png')} style={styles.avatar} />
          <Text style={styles.nameTitle}>Juan Butera</Text>
        </View>

        <View>
        <Text style={styles.text1}>Description</Text>
                <View style={styles.box}>
                    <Text style={styles.text2}>Tengo 18 años y me gusta molestar a Hector porque soy un naco y un estupido >:)</Text>
                    
                </View>

        <Text style={styles.text1}>My Tags</Text>
                <View style={styles.box}>
                    <Text style={styles.text2}>Tengo 18 años y me gusta molestar a Hector porque soy un naco y un estupido >:)</Text>
                    
                </View>
                
        <Text style={styles.text1}>My Photos</Text>
        <View style={styles.marginPh}>
                <View style={styles.box2}></View>
                <View style={styles.box2}></View>
                <View style={styles.box2}></View>
        </View>

        </View>

        

        </ScrollView>
    </SafeAreaView>
  );
}

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

  text1: {
    fontFamily: 'LeagueSpartan_800ExtraBold', 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    marginLeft: 20
  },

  text2: {
    fontFamily: 'LeagueSpartan_800ExtraBold', 
    fontSize: 15, 
    marginBottom: 5,
    marginTop: 5,
    color: 'black',
    marginLeft: 10,
    marginRight: 10
  },

  scrollView: {
    
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
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 20
  },

  box2: {
    width: 140,
    height: 180,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#00A19D',
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 20
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
    backgroundColor: '#fff',
  },
  avatar: {
    width: 150,
    height: 190,
    borderRadius: 0,
    marginTop: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
