import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import Color from '../components/Color';
import ImageResizer from '@bam.tech/react-native-image-resizer'; // Import the library at the top of your file



export default function CameraScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);


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
                const options = { quality: 0.5, base64: true, exif: false };
                const data = await cameraRef.current.takePictureAsync(options);
                setBase64Image(data.base64);
                setImage(data.uri);
            } catch (e) {
                console.log(e);
            }
        }
    }

    // const takePicture = async () => {
    //     if (cameraRef) {
    //         try {
    //             setBase64Image(null);
    //             setImage(null);
    //             const options = { quality: 1, base64: true, exif: false };
    //             const data = await cameraRef.current.takePictureAsync(options);
    //             const resizedImage = await ImageResizer.createResizedImage(
    //               `data:image/jpeg;base64,${data.base64}`, // Source URI
    //               800, // width
    //               600, // height
    //               'JPEG', // compress format
    //               80, // quality
    //               0, // rotation
    //               null, // outputPath
    //               true, // keep meta
    //             );
    //             setBase64Image(resizedImage.base64); // Update to use resized base64
    //             setImage(resizedImage.uri); // Update to use resized URI
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    // };


    //Save Image, save Image to mediaLibrary
    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                setModalVisible(true);
            } catch (e) {
                console.log(e);
            }
        }
    }

    const handleMealSelection = (mealType) => {
        setModalVisible(false);
        navigation.navigate('foodform', { meals: mealType.toLowerCase(), base64: base64Image });

    };

    return (
        <View style={styles.container}>
                    {/* Modal for selecting the meal type */}

            <Modal
                visible={isModalVisible}
                onRequestClose={() => {
                setModalVisible(!isModalVisible);
                }}
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Which meal is this?</Text>
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((mealType) => (
                  <TouchableOpacity
                    key={mealType}
                    style={styles.mealButton}
                    onPress={() => handleMealSelection(mealType)}
                  >
                    <Text style={styles.textStyle}>{mealType}</Text>
                  </TouchableOpacity>
                ))}
              </View>
                </View>
            </Modal>

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
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isModalVisible}
                            onRequestClose={() => {
                                setModalVisible(!isModalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Which meal is this?</Text>
                                    {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((mealType) => (
                                        <TouchableOpacity
                                            key={mealType}
                                            style={styles.mealButton}
                                            onPress={() => handleMealSelection(mealType)}
                                        >
                                            <Text style={styles.textStyle}>{mealType}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </Modal>
                        <View style={styles.buttonRow}>
                            <CameraButton title={'Retake'} icon="retweet" onPress={() => setImage(null)} />
                            <View style={{ width: 30 }} />
                            <CameraButton title={'Save & Analyze'} icon="upload" onPress={saveImage} />
                        </View>

                    </View>

                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 30,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    mealButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: Color.gradientPink,
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: Color.textBrown,
        fontWeight: '800',
        fontSize: 20,
    },
});


function CameraButton({ title, onPress, icon, color }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.afterButton}>
            <Entypo name={icon} size={28} color={color ? color : '#fbf4c0'} />
            <Text style={styles.afterText}>{title}</Text>
        </TouchableOpacity>
    )
}