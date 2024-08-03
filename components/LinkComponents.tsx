import { Linking, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
    url: string
    children: any
}

const LinkComponent = ({ url, children }: Props) => {
    const handlePress = async () => {
        // Verifica si se puede abrir el enlace
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.log(`No se puede abrir esta URL: ${url}`);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.linkContainer}>
            <Text style={styles.linkText}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    linkContainer: {
        margin: 10,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default LinkComponent;