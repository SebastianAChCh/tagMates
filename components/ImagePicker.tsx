import { launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { FileMessage, Message } from '../types/Messages';
import { Dispatch, useEffect, useState } from 'react';
import { useAuth } from '../providers/Authentication';

type Props = {
    email: string,
    sender: string,
    receiver: string,
    setMessage: Dispatch<React.SetStateAction<Message | null>>
    setFile: Dispatch<React.SetStateAction<boolean>>
}

const ImagePicker = ({ sender, receiver, email, setMessage, setFile }: Props) => {
    const { INITIAL_URL } = useAuth();
    const [galleryPermissions, setGalleryPermissions] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        (async () => {
            const res = await requestMediaLibraryPermissionsAsync();
            setGalleryPermissions(res.status === 'granted');
        })();
    }, []);


    useEffect(() => {
        (async () => {
            if (image.trim() && galleryPermissions) {
                let data: FileMessage | null = null;

                const formData = new FormData();
                let response: any;

                if (Platform.OS === 'web') {
                    try {

                        response = await fetch(`${INITIAL_URL}/saveFileMessageBase64`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                base64: image,
                                name: 'name'
                            })
                        });
                    } catch (error) {
                        console.error('error', error);
                    }
                } else {
                    const localUri = image;
                    const fileName = localUri.split('/').pop();
                    const fileType = localUri.split('.').pop();

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
                        console.error('error', error);
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
                } catch (error) {
                    console.error(error);
                }
                setImage('');
            }
        })();

    }, [image]);

    const handleLibraryImage = async () => {
        try {
            let result = await launchImageLibraryAsync({
                base64: false,
                mediaTypes: MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri)
            }

        } catch (error: any) {
            console.error(error.message);
        }
    }


    return (
        <View>
            <TouchableOpacity onPress={handleLibraryImage}>
                <Text>Select Image</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ImagePicker