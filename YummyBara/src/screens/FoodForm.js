import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Swipeable, TextInput } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Color from '../components/Color';
import { db, auth } from '../config/firebase'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const FoodForm = ({route}) => {
    console.log(route.params.meals);
    const imageUri = route.params.base64;

    const mealOfTheDay = route.params.meals;
    
    const [foodList, setFoodList] = useState([]);
    const [portionList, setPortionList] = useState([]);
    const [calorieList, setCalorieList] = useState([]);
    const [newFood, setNewFood] = useState('');
    const [newPortion, setNewPortion] = useState('');

    useEffect(() => {
        const fetchInfo = async (imageUri) => {
            try {
                // call kelly's function with imageUri, then set foodList
                let infoObj = callKelly(imageUri);
                setFoodList(infoObj.foodName);
                setPortionList(infoObj.weightInGrams);
                setCalorieList(infoObj.calories);

            } catch (e) {
                console.error("failed to fetch data:");
            }
        }

        fetchInfo(imageUri);

    }, [])
  

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
        const newCalorieList = calorieList.filter((item, idx) => idx !== index);
        setFoodList(newFoodList);
        setPortionList(newPortionList);
        setCalorieList(newCalorieList);
    }

  const addFoodItem = async () => {
    if (newFood && newPortion) {
      let newCalorie = await generateCalorie(newFood, newPortion);
      setFoodList([...foodList, newFood]);
      setPortionList([...portionList, newPortion]);
      setCalorieList([...calorieList, newCalorie]);
      setNewFood('');
      setNewPortion('');
    }
  }

  const { GoogleGenerativeAI } = require("@google/generative-ai");

  const genAI = new GoogleGenerativeAI("AIzaSyDwMw-gPQUe3c2cEmRyTtMgLFy9gCq-cec");

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const generateCalorie = async (food, portion) => {
    const prompt = `give me the calories of ${portion}g of ${food}, just the numbers, your answer should be purely numerical`
    const result = await model.generateContent(prompt);
    const resp = await result.response;
    const text = resp.text();
    console.log(text);

    return +text;
  }

  const saveMeal = async () => {
    const foodsCol = collection(db, "users", "1cUuycqToXScOMULajPx", "foods");
    const calTracksCols = collection(db, "users", "1cUuycqToXScOMULajPx", "calTracks");
    let mealFoodsId = [];

    try {
      for (let i = 0; i < foodList.length; ++i) {
        const docRef = await addDoc(foodsCol, {
          dateAdded: serverTimestamp(),
          foodItem: {
            calories: calorieList[i],
            name: foodList[i],
            portion: portionList[i]
          }
        });
        mealFoodsId = [...mealFoodsId, docRef.id];
      }

      await addDoc(calTracksCols, {
        date: serverTimestamp(),
        meal: {
          [mealOfTheDay]: mealFoodsId
        }
      })


    } catch (err) {
      console.error(err);
    }

  }

  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.foodImage} />
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
        <TouchableOpacity style={styles.button} onPress={addFoodItem}><Text style={{ color: 'white' }} >Add</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveMeal}><Text style={{ color: 'white' }}>Save Meal</Text></TouchableOpacity>

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
    borderColor: Color.gradientBeige
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
    backgroundColor: 'white',
    padding: 10,
  },

  input: {
    borderColor: Color.textBrown,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    margin: 20,
    width: 145,
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

export default FoodForm;