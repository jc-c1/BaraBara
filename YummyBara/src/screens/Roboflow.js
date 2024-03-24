import axios from 'axios';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { REACT_APP_ROBOFLOW_API_KEY } from '@env';

export default function Roboflow( props ) {
    useEffect(() => {
        // Define function to read image file asynchronously
        
        const readImage = async () => {
          try {
            // Read the image file
            const image = props.route.params.base64;
    
            // Make HTTP POST request with Axios
            axios({
              method: 'POST',
              url: 'https://detect.roboflow.com/food-items-with-reference-objects/3',
              params: {
                api_key: REACT_APP_ROBOFLOW_API_KEY,
              },
              data: image,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
              .then(function (response) {
                console.log(response.data);
                widthHeight(response.data);
              })
              .catch(function (error) {
                console.log(error.message);
              });
          } catch (error) {
            console.error(error);
          }
        };
    
        // Call the function to read the image file
        readImage();
      }, []); // Run once when component mounts
    
return (
    <View><Text>Hello</Text></View>
)
}

function widthHeight(roboData) {
  const resultData = roboData;
  const count = roboData.predictions.length;
  const coinWxH = [];
  const foodWxH = [];

  roboData.predictions.forEach(prediction => {
    if (prediction.class === "coin") {
      coinWxH.push(prediction.width);
      coinWxH.push(prediction.height);
    } else {
      foodWxH.push(prediction.width);
      foodWxH.push(prediction.height);
    }
  });

  console.log("Coin Width x Height:", coinWxH);
  console.log("Food Width x Height:", foodWxH);
}
