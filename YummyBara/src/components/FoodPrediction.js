// import * as FileSystem from 'expo-file-system';
import { ACCESS_TOKEN, PROJECT_ID_1, ENDPOINT_ID_1, ENDPOINT_ID_2, REACT_APP_GEMINI_API_KEY } from '@env';

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const getCalories = async (volume, food) => {
    const prompt = `I have ${volume} cm3 of ${food}. Please convert this volume of ${food} into approximated weight and approximated calories. If you don't have the exact information, please give your best guess and do not request clarification. Please send your response in the strict format: '{weightInGrams: number, calories: number}'`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); 
  
    str = text.replace(/'/g, '"').replace(/(\w+)(?=:)/g, '"$1"');
    const obj = JSON.parse(str);
    const resultThing = {
        weightInGrams: [obj.weightInGrams],
        calories: [obj.calories],
        foodName: [food]
    };
  
    return resultThing;
};

const makePrediction = async (image_data) => {
    const requestBody = {
        instances: [
            { content: image_data }
        ],
        parameters: {
            confidenceThreshold: 0.7,
            maxPredictions: 5
        }
    };

    try {
        // const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID_1}/locations/us-central1/endpoints/${ENDPOINT_ID_1}:predict`, {
        const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID_1}/locations/us-central1/endpoints/${ENDPOINT_ID_2}:predict`, {
                method: 'POST',
            headers: {
                'Authorization': `Bearer ya29.a0Ad52N38uUnrvLlb96TOO4V4d5DBm8LpNEgtkB29dArsG91tXpOLGG0TNqB26PGFI1HwtVcu3nYefGI0YtHqZp9h-Vv5SanGQQDYLhMqNm3y3lpGx6pr0VzLPQFCpwSPrHcLS6e4b2pdolQyWB7f94CCkgcsMBDcyzILiaCgYKAdwSARESFQHGX2Mi__xS_ABpY1n-Tk9hd5x_SQ0171`,  
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const jsonResponse = await response.json();

        if (response.ok) {
            console.log('Prediction result:', jsonResponse);
            //const responseObj = typeof jsonResponse === 'string' ? JSON.parse(jsonResponse) : jsonResponse;
            const detectedItems = jsonResponse.predictions[0].displayNames;
            const firstNonToonieItem = detectedItems.find(item => item !== "toonie");
            console.log('firstItem:', firstNonToonieItem);
            if (firstNonToonieItem) {
                console.log("AM I HERE");
                return firstNonToonieItem;
            } else {
                return "No food detected.";
            }
        } else {
            console.error('Prediction API error:', jsonResponse.error);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
};

const FoodPrediction = async (image_data) => {
    // fake image data, need to uncomment import statement to use
    // const image_data = await FileSystem.readAsStringAsync("/Users/kellychen/Desktop/hackathons/bcsHack2024/BaraBara/YummyBara/assets/IMG_3994.jpg", { encoding: FileSystem.EncodingType.Base64 });
    let food = await makePrediction(image_data);
    if (food === "No food detected.") {
        let returnObject = {
            "calories": [],
            "foodName": [],
            "weightInGrams": []
        };
        console.log(returnObject);
        return returnObject;
    }
    // console.log("Food before giving to Rhoda", food);
    
    let volume = Roboflow(food, image_data);
    // volume = 30;
    let returnObject = await getCalories(volume, food);
    console.log("Result Object before returning to Shiyu:", returnObject)
    return returnObject;
};

export default FoodPrediction;