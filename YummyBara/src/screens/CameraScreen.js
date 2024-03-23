import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';


export default function CameraScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    //Ask for permission to access Media Library and Camera
    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
        })();
    }, [])


    if (hasCameraPermission === false) {
        return <Text>Requesting camera permissions.</Text>
    } else if (!hasCameraPermission) {
        return <Text>Do not have permission for camera. Please change this in settings.</Text>
    }

    //Take picture, setting uri of the image to Image
    const takePicture = async () => {
        if (cameraRef) {
            try {
                setBase64Image(null);
                setImage(null);
                const options = { quality: 1, base64: true, exif: false };
                const data = await cameraRef.current.takePictureAsync(options);
                setBase64Image(data.base64);
                setImage(data.uri);
            } catch (e) {
                console.log(e);
            }
        }
    }

    //Save Image, save Image to mediaLibrary
    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                //console.log(base64Image);
                //setBase64Image(null);
                //setImage(null);
                navigation.navigate('Roboflow', { base64: base64Image },);       
                //base64Image = the base64 of image the app just took!!!!
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <View style={styles.container}>

            {/* if image === true, open Camera, else display the Image */}

            {!image ?
                <Camera
                    style={styles.camera}
                    type={type}
                    ref={cameraRef}
                >
                </Camera>
                :
                <Image source={{ uri: image }} style={styles.camera} />
            }
            <View style={styles.buttonContainer}>

                {/* if image === true, run takePicture, else either retake or save */}

                {!image ?
                    <View>
                        <CameraButton title={'Take a picture'} icon="camera" onPress={takePicture} />
                    </View>
                    :
                    <View style={styles.buttonRow}>
                        <CameraButton title={'Retake'} icon="retweet" onPress={() => setImage(null)} />
                        <View style={{ width: 30 }} />
                        <CameraButton title={'Save'} icon="upload" onPress={saveImage} />
                    </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 50,
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    afterButton: {
        bottom: 50, // Adjust this value to change the distance from the bottom
        borderRadius: 20, // Add border radius for a rounded button
        paddingVertical: 10, // Add padding for better touch area
        paddingHorizontal: 20, // Add horizontal padding
        backgroundColor: 'rgba(245, 115, 85,0.5)', // Add a background color to the button
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    afterText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fbf4e0',
        marginLeft: 10,
    }
});


function CameraButton({ title, onPress, icon, color }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.afterButton}>
            <Entypo name={icon} size={28} color={color ? color : '#fbf4c0'} />
            <Text style={styles.afterText}>{title}</Text>
        </TouchableOpacity>
    )
}