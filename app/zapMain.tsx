import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import ProfileCard from '../components/ProfileCard';
// import ImageCarousel from '../components/Carrusel';

export default function Zaps({ navigation }: { navigation: any }) {
  const handleZap = () => {
    console.log('Zap!');
  };

  const handleNext = () => {
    console.log('Next!');
  };

  return (
    <SafeAreaView style={styles.container}>
    <View >
      <View style={styles.header}>
        <Text
          style={[styles.title, { fontFamily: 'LeagueSpartan_800ExtraBold' }]}
        >
          Profile
        </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Image
          source={require('../assets/images/chat.png')}
          style={{
            height: 24,
            width: 30,
            bottom: 4,
          }}
        />
      </TouchableOpacity>
      </View>
      {/* <ImageCarousel/> */}

      <View style={styles.imgCont}>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/zap2.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/next.png')}
            style={styles.img}
          />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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

  img: {
    height: 180,
    width: 180,
  },

  imgCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
