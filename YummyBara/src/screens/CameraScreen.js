import { Entypo } from '@expo/vector-icons';
import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const cameraRef = useRef(null);
    const cameraType = Camera.Constants.Type.back;
    //const navigation = useNavigation();

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

    //Save Image and send base64 to Roboflow
    const saveImageRobo = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                console.log(base64Image);
                setBase64Image(null);
                setImage(null);
                //navigation.navigate('Roboflow', { base64: base64Image },);
                //base64Image = the base64 of image the app just took!!!!
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <View style={styles.container}>
            {!image ?
                <View>
                    <Camera
                        style={styles.camera}
                        type={cameraType}
                        ref={cameraRef}
                    ></Camera>
                    <CameraButton title={'Take a picture'} icon="camera" onPress={takePicture} style={styles.buttonContainer}/>
                </View>
                :
                <>
                    <Image source={{ uri: image }} style={styles.camera} />
                    <View style={styles.buttonRow}>
                        <CameraButton title={'Retake'} icon="retweet" onPress={() => setImage(null)} />
                        <View style={{ width: 25 }} />
                        <CameraButton title={'Save and Analyze'} icon="upload" onPress={saveImageRobo} />
                    </View>
                </>}
        </View>
    )
}

function CameraButton({ title, onPress, icon, color }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.afterButton}>
            <Entypo name={icon} size={28} color={color ? color : '#fbf4c0'} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'Center',
    },
    afterButton: {
        bottom: 50, 
        borderRadius: 20, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        backgroundColor: 'rgba(245, 115, 85,0.5)', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fbf4e0',
        marginLeft: 10,
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
})