import React from "react";
import { Image, StyleSheet, Text, View} from 'react-native';

const FoodForm = ({route}) => {
    const {imageUri} = route.params;
    const {food} = route.params;
    const {portion} = route.params;

    return (
        <View style={styles.container}>
            <Image source={{uri: imageUri}} style={styles.foodImage}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    foodImage: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 5
    },
    panel: {
        
    }
})