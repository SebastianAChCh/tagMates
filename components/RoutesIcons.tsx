import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';

const RoutesIcons = ({ navigation, src, route }: { navigation: any; src: ImageSourcePropType; route: string; }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate(route)}>
                <Image
                    source={src}
                    style={route === "Profile" ? styles.imgRed: styles.imgMin}
                    resizeMode="stretch"
                />
            </TouchableOpacity>
            <Text style={route === "Profile" ? styles.textProf: styles.textMin}>{route}</Text>
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
        left: '5%',
        right: '5%',
    },
    imgMin: {
        width: 35,
        height: 35,
        bottom: 3
    },

    imgRed: {
        width: 35,
        height: 35,
        borderRadius: 100,
        right: 7,
        bottom: 2
        
    },

    textMin: {
        fontSize: 10,
        color: 'black',
    },

    textProf: {
        fontSize: 10,
        color: 'black',
        right: 6

    },
});

export default RoutesIcons;
