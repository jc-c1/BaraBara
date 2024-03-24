import { useState } from 'react';
import { Button, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';

const YourComponent = () => {
    const [prediction, setPrediction] = useState(null);

    const makePrediction = async () => {
        const PROJECT_ID = '273475886070';
        const ENDPOINT_ID = '8666058180037443584';
        const IMAGE_DATA = await FileSystem.readAsStringAsync("/Users/kellychen/Desktop/hackathons/bcsHack2024/BaraBara/YummyBara/assets/favicon.png", { encoding: FileSystem.EncodingType.Base64 });

        const requestBody = {
            instances: [
                { content: IMAGE_DATA }
            ],
            parameters: {
                confidenceThreshold: 0.5,
                maxPredictions: 5
            }
        };
        console.log(JSON.stringify(requestBody));

        try {
            const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ya29.a0Ad52N383T6Z_VKBoXEVqeLhpI723LNuZBMTJ-XddI-4B9Bm34ZS7IfOEg0pjwMNF6-Dqd8L6a_OGRM0Lsgupu5L9WekJWal-DbP-3ihIo8WVDcavSgosjKCrUracpmPObBMci_LxFXt2oMoUJsfhi8IPpJ2jN6qR2g8IaCgYKAXYSARESFQHGX2MinndUaULDldqbQbzd79DrlQ0171`,  // Use the access token you obtained
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const jsonResponse = await response.json();

            if (response.ok) {
                setPrediction(jsonResponse);
                console.log('Prediction result:', jsonResponse);
            } else {
                // Handle server errors (e.g., bad request, unauthorized, etc.)
                console.error('Prediction API error:', jsonResponse.error);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
        }
    };

    return (
        <>
            <Button title="Make Prediction" onPress={makePrediction} />
            {prediction && <Text>{JSON.stringify(prediction, null, 2)}</Text>}
        </>
    );
};

export default YourComponent;
