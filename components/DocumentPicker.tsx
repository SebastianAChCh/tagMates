import { getDocumentAsync } from 'expo-document-picker';
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
    const [document, setDocument] = useState<string>('');

    useEffect(() => {
        (async () => {
            if (document.trim()) {
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
                                base64: document,
                                name: 'name'
                            })
                        });
                    } catch (error) {
                        console.error('error', error);
                    }
                } else {
                    const localUri = document;
                    const fileName = localUri.split('/').pop();
                    const fileType = localUri.split('.').pop();

                    formData.append('file', {
                        uri: localUri,
                        name: fileName,
                        type: `file/${fileType}`,
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
                    type: 'file/document',
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
                                type: 'file/document'
                            }
                        })
                    });
                } catch (error) {
                    console.error(error);
                }
                setDocument('');
            }
        })();

    }, [document]);

    const handleLibraryDocuments = async () => {
        try {
            const documentRes = await getDocumentAsync();
            if (Platform.OS !== 'web' && !documentRes.canceled) {
                setDocument(documentRes.assets[0].uri);
            } else if (documentRes.assets) {
                setDocument(documentRes.assets[0].uri);
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <View>
            <TouchableOpacity onPress={handleLibraryDocuments}>
                <Text>Select File</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ImagePicker