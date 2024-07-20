import { View, Image, StyleSheet } from 'react-native';
import RoutesIcons from './RoutesIcons';

const Menu = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.barBox}>
            <View>
                <Image
                    source={require('../assets/images/arrow.png')}
                    style={styles.imgMin}
                    resizeMode="stretch"
                />
            </View>

            <RoutesIcons navigation={navigation} route='Mates' src={require('../assets/images/mates.png')} />

            <RoutesIcons navigation={navigation} route='Taggie' src={require('../assets/images/heart.png')} />

            <RoutesIcons navigation={navigation} route='Health' src={require('../assets/images/health.png')} />

            <RoutesIcons navigation={navigation} route='Settings' src={require('../assets/images/settings.png')} />

            <RoutesIcons navigation={navigation} route='Profile' src={require('../assets/images/blankProf.png')} />
        </View>
    )
}

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
        left: '5%',
        right: '5%',
    },
    imgMin: {
        width: 35,
        height: 35,
    },

    textMin: {
        fontSize: 10,
        fontFamily: 'Custom',
        color: 'black',
    },
});

export default Menu