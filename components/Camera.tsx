import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { CameraType, launchCameraAsync, requestCameraPermissionsAsync } from 'expo-image-picker';
import { useAuth } from '../providers/Authentication';
import { FileMessage, Message } from '../types/Messages';
import { Dispatch, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Platform } from 'react-native';

type Props = {
    email: string,
    sender: string,
    receiver: string,
    setMessage: Dispatch<React.SetStateAction<Message | null>>
    setFile: Dispatch<React.SetStateAction<boolean>>
}

const Camera = ({ email, sender, receiver, setMessage, setFile }: Props) => {
    const { INITIAL_URL } = useAuth();
    const cameraRef = useRef<CameraView | null>(null)
    const [permission, requestPermission] = useCameraPermissions();

    const handlePhoto = async () => {
        if (Platform.OS === 'web') {
            if (!permission) return <></>

            if (!permission.granted) {
                // Camera permissions are not granted yet.
                return (
                    <View style={styles.container}>
                        <Text style={styles.message}>We need your permission to show the camera</Text>
                        <Button onPress={requestPermission} title="grant permission" />
                    </View>
                );
            }


        } else {
            try {
                await requestCameraPermissionsAsync();
                let result = await launchCameraAsync({
                    cameraType: CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,

                });

                if (!result.canceled) {
                    saveImage(result.assets[0].uri);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    const saveImage = async (url: string) => {
        let data: FileMessage | null = null;
        let response: any;

        if (Platform.OS === 'web') {
            try {

                response = await fetch(`${INITIAL_URL}/saveFileMessageBase64`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        base64: url,
                        name: 'name'
                    })
                });
            } catch (error) {
                console.error('error', error);
            }
        } else {
            const localUri = url;
            const fileName = localUri.split('/').pop();
            const fileType = localUri.split('.').pop();

            const formData = new FormData();
            formData.append('file', {
                uri: localUri,
                name: fileName,
                type: `image/${fileType}`,
            });

            try {
                response = await fetch(`${INITIAL_URL}/saveFileMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                });
            } catch (error) {
                console.error(error);
            }
        }

        try {
            data = await response.json();
        } catch (error) {
            console.error(error);
        }

        if (!data) return;

        setMessage({
            message: data.file,
            type: 'file/image',
            sender,
            receiver
        })
        setFile(true);

        try {
            await fetch(`${INITIAL_URL}/saveTextMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    Message: {
                        sender,
                        receiver,
                        message: data.file,
                        type: 'file/image'
                    }
                })
            });
        } catch (error: any) {
            console.error(error.message);
        }
    }
    return Platform.OS === 'web' ? (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing='front' ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={async () => {
                        const picture = await cameraRef.current?.takePictureAsync({
                            quality: 1
                        })

                        if (picture!.uri) saveImage(picture!.uri);
                    }}>
                        <Text style={styles.text}>Take photo</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    ) : (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.buttonEnableCamera} onPress={handlePhoto}>
            <Text>Enable camera</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    buttonEnableCamera: {
        backgroundColor: '#ffffff',
        height: 40,
        width: 120,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Camera;