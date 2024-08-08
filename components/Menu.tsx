import { View, Image, StyleSheet } from 'react-native';
import RoutesIcons from './RoutesIcons';
import {
  LeagueSpartan_400Regular,
  LeagueSpartan_600SemiBold,
  LeagueSpartan_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/league-spartan';

const Menu = ({ navigation }: { navigation: any }) => {
  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_400Regular,
  });
  return (
    <View style={styles.barBox}>
      <View>
        <Image
          source={require('../assets/images/arrow.png')}
          style={styles.imgMin}
          resizeMode="stretch"
        />
      </View>

      <RoutesIcons
        navigation={navigation}
        route="Mates"
        src={require('../assets/images/mates.png')}
      />

      <RoutesIcons
        navigation={navigation}
        route="Taggie"
        src={require('../assets/images/heart.png')}
      />

      <RoutesIcons
        navigation={navigation}
        route="Health"
        src={require('../assets/images/health.png')}
      />

      <RoutesIcons
        navigation={navigation}
        route="Settings"
        src={require('../assets/images/settings.png')}
      />

      <RoutesIcons
        navigation={navigation}
        route="Profile"
        src={require('../assets/images/blankProf2.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barBox: {
    backgroundColor: 'white',
    height: 60,
    width: 350,
    padding: 10,
    borderRadius: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 20,
    alignContent: 'center',
    alignSelf: 'center'
  },
  
  imgMin: {
    width: 35,
    height: 35,
  },

  textMin: {
    fontSize: 10,
    fontFamily: 'LeagueSpartan_400Regular',
    color: 'black',
  },
});

export default Menu;
