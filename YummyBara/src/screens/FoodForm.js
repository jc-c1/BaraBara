import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { Swipeable, TextInput } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';
import Color from './src/components/Color';

const FoodForm = ({route}) => {
    const {imageUri} = route.params;
    const {food} = route.params; // initial list of foods
    const {portion} = route.params;
    
    
    const [foodList, setFoodList] = useState(food);
    const [portionList, setPortionList] = useState(portion);
    const [newFood, setNewFood] = useState('');
    const [newPortion, setNewPortion] = useState('');
  

    const renderRightActions = (index) => {
        return (
          <TouchableOpacity onPress={() => deleteItem(index)} style={styles.deleteBox}>
            <Text> </Text>
          </TouchableOpacity>
        );
    }
    
    const deleteItem = (index) => {
        const newFoodList = foodList.filter((item, idx) => idx !== index);
        const newPortionList = portionList.filter((item, idx) => idx !== index);
        setFoodList(newFoodList);
        setFoodList(newPortionList);
    }

    const addFoodItem = () => {
        if (newFood && newPortion) {
          setFoodList([...foodList, newFood]);
          setPortionList([...portionList, newPortion]);
          setNewFood('');
          setNewPortion('');
        }
    }
    
    
    return (
    
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={muffin} style={styles.foodImage}/>
              <View style={styles.title}>
                <Text style={styles.boldText}>Food: </Text>
                <Text style={styles.boldText}>Portion: </Text>
              </View>
              <GestureHandlerRootView style={{ flex: 1 }}>
              {foodList.map((item, index) => {
                return (
                  <Swipeable key={index} renderRightActions={() => renderRightActions(index)}>
                  <View style={styles.sideBySide}>
                    <View style={styles.foodPanel}>
                        <Text style={styles.regText}>{item}</Text>
                    </View>
                    <View style={styles.portionPanel}>
                        <Text style={styles.regText}>{portionList[index]}</Text>
                    </View>
                </View>
                </Swipeable>
                )
              })}
              <View style={styles.sideBySide}>
                <TextInput style={styles.input} placeholder='food item' value={newFood} onChangeText={setNewFood}></TextInput>
                <TextInput style={styles.input} placeholder='portion in grams' value={newPortion} onChangeText={setNewPortion}></TextInput>
              </View>
              <TouchableOpacity style={styles.button} onPress={addFoodItem}><Text style={{color: 'white'}} >Add</Text></TouchableOpacity>
              <View style={styles.button}><Text style={{color: 'white'}}>Save Meal</Text></View>
              
              </GestureHandlerRootView>
        </ScrollView>
        );
}

const styles = StyleSheet.create({
    title: {
      marginLeft: 65,
      flexDirection: 'row',
      width: '100%',
    },
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: 20,
        backgroundColor: Color.gradientWhite
    },
    foodImage: {
        width: '100%',
        height: 250,
        alignSelf: 'flex-start',
        borderWidth: 2,
        borderColor: Color.tabGreenOutline
    },
    foodPanel: {
      padding: 15,
      margin: 20,
      backgroundColor: Color.tabYellow,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: Color.tabOutlineYellow,
      alignItems: 'center',
      flex: 1
    },
    portionPanel: {
      padding: 15,
      margin: 20,
      backgroundColor: Color.tabPink,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: Color.tabOutlinePink,
      alignItems: 'center',
      flex: 1
    },
    boldText: {
      fontWeight: 'bold',
      padding: 5,
      flex: 1,
      alignItems: 'center',
      color: Color.textBrown
    },
  
    regText: {
      color: Color.textBrown
    },
    sideBySide: {
      flexDirection: 'row',
      width: '100%',
      opacity: 0.8,
    },
  
    deleteBox: {
      backgroundColor: 'white', // Temporarily set a background color to ensure visibility
      padding: 10,
    },
  
    input: { 
      borderColor: Color.textBrown, 
      borderWidth: 1, 
      padding: 10, 
      borderRadius: 15,
      margin: 20
    },
  
    button: {
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 15,
      borderColor: Color.tabOutlinePink,
      backgroundColor: Color.gradientPink,
      padding: 10,
      margin: 15,
    }
  }) 