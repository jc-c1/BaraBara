const FoodPrediction = require('../FoodPrediction'); // Adjust the path as necessary
const FileSystem = require('expo-file-system'); // Note: 'expo-file-system' might not work outside of a React Native environment

// FoodPrediction(image_data)
//   .then(result => {
//     console.log('FoodPrediction result:', result);
//   })
//   .catch(error => {
//     console.error('FoodPrediction error:', error);
//   });

async function testFoodPrediction() {
  try {
    const image_data = await FileSystem.readAsStringAsync("/Users/kellychen/Desktop/hackathons/bcsHack2024/BaraBara/YummyBara/assets/IMG_3994.jpg", { encoding: FileSystem.EncodingType.Base64 });
    const result = await FoodPrediction(image_data);
    console.log('FoodPrediction result:', result);
  } catch (error) {
    console.error('FoodPrediction error:', error);
  }
}

testFoodPrediction(); // Call the function
