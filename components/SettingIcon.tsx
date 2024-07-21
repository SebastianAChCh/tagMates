import { Image, StyleSheet, Text, View, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingIcon = ({ src, route, icon }: { src: ImageSourcePropType, route: string, icon: string }) => {
    return (
        <TouchableOpacity>
            <View style={styles.optionItem}>
                <Image source={src}
                    style={styles.image} />
                <Text style={styles.optionText}>{route}</Text>
                <Icon name={icon} size={15} color="#000" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 35,
        width: 35,
        borderRadius: 5
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 10
    },
    optionText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16
    },
});

export default SettingIcon;