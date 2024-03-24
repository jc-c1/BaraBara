import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { ACCESS_TOKEN, PROJECT_ID_1, ENDPOINT_ID_1, REACT_APP_GEMINI_API_KEY } from '@env';
import { View, Text, Button } from 'react-native';


const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const YourComponent = () => {
    const [prediction, setPrediction] = useState(null);
    const [resultObject, setResultObject] = useState(null);

    const getCalories = async (volume, food) => {
        const prompt = `I have ${volume} cm3 of ${food}. Please convert this volume of ${food} into approximated weight and approximated calories. If you don't have the exact information, please give your best guess and do not request clarification. Please send your response in the strict format: '{weightInGrams: number, calories: number}'`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text(); 
      
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
      
        return resultThing;
      };

    // TODO:UNCOMMENT
    // const returnToShiyu = async (image_data) => {
    const returnToShiyu = async () => {
        // TODO:REMOVE 
        const image_data = await FileSystem.readAsStringAsync("/Users/kellychen/Desktop/hackathons/bcsHack2024/BaraBara/YummyBara/assets/burgerSushi.png", { encoding: FileSystem.EncodingType.Base64 });
        let food = await makePrediction(image_data);
        console.log("Food before giving to Rhoda", food);
        
        // TODO:UNCOMMENT
        // let volume = callRhoda(food, image_data);

        // TODO:REMOVE
        volume = 30;
        let resultObject = await getCalories(volume, food);
        console.log("Result Object before returning to Shiyu:", resultObject)
        // TODO:UNCOMMENT
        // return returnObject;
        setResultObject(resultObject);
    };

    const makePrediction = async (image_data) => {
        const requestBody = {
            instances: [
                { content: image_data }
            ],
            parameters: {
                confidenceThreshold: 0.2,
                maxPredictions: 5
            }
        };

        try {
            const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID_1}/locations/us-central1/endpoints/${ENDPOINT_ID_1}:predict`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,  
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const jsonResponse = await response.json();

            if (response.ok) {
                // setPrediction(jsonResponse);
                console.log('Prediction result:', jsonResponse);
                const responseObj = typeof jsonResponse === 'string' ? JSON.parse(jsonResponse) : jsonResponse;
                const detectedItems = responseObj.predictions[0].displayNames;
                const firstNonToonieItem = detectedItems.find(item => item !== "toonie");
                console.log('firstItem:', firstNonToonieItem);
                if (firstNonToonieItem) {
                    return firstNonToonieItem;
                } else {
                    return "No food detected.";
                }
            } else {
                // Handle server errors (e.g., bad request, unauthorized, etc.)
                console.error('Prediction API error:', jsonResponse.error);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
        }
    };


    //TODO:REMOVE
    return (
        <>
            <Button title="Make Prediction" onPress={returnToShiyu} />
            {resultObject && <Text>{JSON.stringify(resultObject, null, 2)}</Text>}
        </>
    );
};

export default YourComponent;
