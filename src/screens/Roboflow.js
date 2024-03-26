// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { Text, View } from 'react-native';
// import { REACT_APP_ROBOFLOW_API_KEY } from '@env';

// export default function Roboflow(f, imgD) {
//   let coinD = 0;
//   const foodWxH = [];
//   const food = f // CHANGE if food is not the correct variable
//   const toonieDiamter = 2.8; //in cm
//   const assumedDepth = 6.0; // in cm
//   const pizzaDepth = 1.5; // in cm

//   useEffect(() => {
//     // Define function to read image file asynchronously

//     const readImage = async () => {
//       try {
//         // Read the image file
//         const image = imgD; // CHANGE if base64 is not the correct variable

//         // Make HTTP POST request with Axios
//         axios({
//           method: 'POST',
//           url: 'https://detect.roboflow.com/food-items-with-reference-objects/4',
//           params: {
//             api_key: REACT_APP_ROBOFLOW_API_KEY,
//           },
//           data: image,
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         })
//           .then(function (response) {
//             console.log(response.data);
//             widthHeight(response.data);
//           })
//           .catch(function (error) {
//             console.log(error.message);
//           });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     // Call the function to read the image file
//     readImage();
//   }, []); // Run once when component mounts


//   function widthHeight(roboData) {
//     const count = roboData.predictions.length;

//     roboData.predictions.forEach(prediction => {
//       if (prediction.class === "coin") {
//         coinD = prediction.width;
//       } else {
//         foodWxH.push(prediction.width);
//         foodWxH.push(prediction.height);
//       }
//     });
//     console.log("Coin Diameter:", coinD);
//     console.log("Food Width x Height:", foodWxH);
//     convertPortion();
//   }

//   function convertPortion() {
//     const scaleFactor = coinD / toonieDiamter;
//     const foodScaledW = foodWxH.get[0] / scaleFactor;
//     const foodScaledH = foodWxH.get[1] / scaleFactor;
//     if (food.toLowerCase() == "pizza") {
//       return (
//         ((foodScaledW * foodScaledH * pizzaDepth) / 2).toFixed(2) // in cm^3
//       )
//     } else {
//       return (
//         (foodScaledW * foodScaledH * assumedDepth).toFixed(2) // in cm^3
//       )
//     }

//   }

// }

import axios from 'axios';
import { REACT_APP_ROBOFLOW_API_KEY } from '@env';

// This function now takes the food item and image data, and returns the calculated volume.
async function calculateFoodVolume(food, imgData) {
    const toonieDiameter = 2.8; // in cm
    const assumedDepth = 6.0; // in cm
    const bananaDepth = 2.5; //in cm
    const pizzaDepth = 1.5; // in cm
    let coinDiameter = 0;
    const foodWidthHeight = [];

    // Perform image analysis using Roboflow
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://detect.roboflow.com/food-items-with-reference-objects/4',
            params: { api_key: REACT_APP_ROBOFLOW_API_KEY },
            data: imgData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const predictions = response.data.predictions;
        predictions.forEach(prediction => {
            if (prediction.class === "coin") {
                coinDiameter = prediction.width;
            } else {
                foodWidthHeight.push(prediction.width, prediction.height);
            }
        });

        // Calculate the scale factor based on the coin diameter to real-life size ratio
        const scaleFactor = coinDiameter / toonieDiameter;
        const foodScaledWidth = foodWidthHeight[0] / scaleFactor;
        const foodScaledHeight = foodWidthHeight[1] / scaleFactor;

        // Calculate volume based on the type of food
        let volume;
        if (food.toLowerCase() === "pizza") {
            volume = ((foodScaledWidth * foodScaledHeight * pizzaDepth) / 2).toFixed(2); // Pizza assumed to be a semi-circle
            // console.log(volume)
          } else if (food.toLowerCase() === "banana") {
            volume = (foodScaledWidth * foodScaledHeight * bananaDepth).toFixed(2); // Other food types assumed to be rectangular prisms
        } else {
            volume = (foodScaledWidth * foodScaledHeight * assumedDepth).toFixed(2);
        }

        return volume; // Return only the volume for further processing
    } catch (error) {
        console.error('Error calculating food volume:', error);
        return null; // Return null if there was an error
    }
}

export default calculateFoodVolume;


