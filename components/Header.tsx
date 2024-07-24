import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ navigation, title }: { navigation: any, title: string }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Text
                    style={[
                        styles.logoText,
                        { fontFamily: 'LeagueSpartan_800ExtraBold' },
                    ]}
                >
                    {title}
                </Text>

                <Image
                    source={require('../assets/images/people.png')}
                    style={[styles.image, styles.margin]}
                    resizeMode="stretch"
                />

                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                    <Image
                        source={require('../assets/images/chat.png')}
                        style={[styles.image, styles.margin]}
                        resizeMode="stretch"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logoText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#00A19D',
    },

    image: {
        width: 32,
        height: 25,
    },

    margin: {
        marginLeft: 20,
        marginTop: 14,
    },

    logoContainer: {
        backgroundColor: '#ffffff',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        paddingHorizontal: 25,
        paddingVertical: 7,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginTop: 5,
        flexDirection: 'row',
    },

    headerContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 0,
        marginBottom: 30,
    },
});

export default Header;
