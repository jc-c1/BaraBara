import { REACT_APP_GEMINI_API_KEY } from '@env';
import { useState } from 'react';
import { View, Text, Button } from 'react-native';

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const getCalories = async (volume, food, setCalorieInfo) => {
  let tryCount = 0;
  const prompt = `I have ${volume} cm3 of ${food}. Please convert this volume of ${food} into approximated weight and approximated calories. Please send your response in the strict format: '{weightInGrams: number, calories: number}'`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text(); 

  console.log("HERE IS THE CONSOLE LOGGED TEXT:", text); 
  console.log(typeof text);


  // Convert the string to a valid JSON string format if necessary
  str = text.replace(/'/g, '"').replace(/(\w+)(?=:)/g, '"$1"');
  // Parse the string to an object
  const obj = JSON.parse(str);
  // Convert each property to an array containing one item
  const resultThing = {
      weightInGrams: [obj.weightInGrams],
      calories: [obj.calories],
      foodName: [food]
  };

  console.log(resultThing);

  // TODO: uncomment return
  // return resultThing;
  // TODO: comment below, move function
  setCalorieInfo(text);
};


const CaloriesComponent = () => {
  const [calorieInfo, setCalorieInfo] = useState('');

  const handleGetCalories = () => {
    // Assuming 'volume' and 'food' are available here. Adjust as necessary.
    volume = 50;
    food = "apple"
    getCalories(volume, food, setCalorieInfo);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Get Calories" onPress={handleGetCalories} />
      <Text>Calorie Info: {calorieInfo}</Text>
    </View>
  );
};

export default CaloriesComponent;






// // ...
// async function run() {
//     const prompt = "Give the average approximated calories of 50 grams of chicken in the strict format: 'numbers calories'"
  
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   }

// run();

// const getCalories = async (volume, food) => {
//   let tryCount = 0
//   const prompt = `I have ${volume} cm3 of ${food}. Please convert this volume of ${food} into approximated weight and approximated calories. Please send your response in the strict format: '{weightInGrams: number, calories: number}'`
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);

//   // while (tryCount < 3) {
//   //   try {
//   //     const response = await result.response;
//   //     const text = response.text();
//   //     console.log(text);

//   //     return parseResponse(response.generations[0].text)
//   //   } catch (e) {
//   //     console.log(e)
//   //     tryCount++
//   //   }
//   // }
// }

// function parseResponse (response) {
//   const jsonMatch = response.match(/{[\s\S]*?}/)

//   if (jsonMatch) {
//     const jsonString = jsonMatch[0]
//     const jsonObject = JSON.parse(jsonString)
//     if (!jsonObject.option1 || !jsonObject.option2) {
//       throw new Error('Improper Response')
//     }
//     return jsonObject
//   } else {
//     throw new Error('cannot get response')
//   }
// }