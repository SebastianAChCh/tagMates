import { View, StyleSheet, Image, Text, Platform, Linking, TouchableOpacity } from 'react-native';
import LinkComponent from './LinkComponents';

type Props = {
    item: {
        type: string;
        message: string;
    };
    INITIAL_URL: string;
};

const Message = ({ item, INITIAL_URL }: Props) => {

    return (
        <View style={styles.messageBox}>
            {item.type === 'text' ? (
                <Text style={styles.messageText}>{item.message}</Text>
            ) : item.type === 'file/image' ? (
                <Image
                    style={styles.imageMessage}
                    source={{ uri: `${Platform.OS === 'web' ? 'http://localhost:3000' : INITIAL_URL}/${item.message.split('\\')[1]}` }}
                />
            ) : (
                <LinkComponent url={INITIAL_URL + '/' + item.message.split('uploads')[1]}>
                    <Text>{item.message.split('uploads')[1].replace(/\\/g, '')}</Text>
                </LinkComponent>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
    imageMessage: {
        height: 200,
        width: 200
    }
});

export default Message;
