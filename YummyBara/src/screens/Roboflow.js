import axios from 'axios';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { REACT_APP_ROBOFLOW_API_KEY } from '@env';

export default function Roboflow(props) {
  let coinD = 0;
  const foodWxH = [];
  const food = props.route.params.food; // CHANGE if food is not the correct variable
  const toonieDiamter = 2.8; //in cm
  const assumedDepth = 6.0; // in cm
  const pizzaDepth = 1.5; // in cm

  useEffect(() => {
    // Define function to read image file asynchronously

    const readImage = async () => {
      try {
        // Read the image file
        const image = props.route.params.base64; // CHANGE if base64 is not the correct variable

        // Make HTTP POST request with Axios
        axios({
          method: 'POST',
          url: 'https://detect.roboflow.com/food-items-with-reference-objects/4',
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


  function widthHeight(roboData) {
    const count = roboData.predictions.length;

    roboData.predictions.forEach(prediction => {
      if (prediction.class === "coin") {
        coinD = prediction.width;
      } else {
        foodWxH.push(prediction.width);
        foodWxH.push(prediction.height);
      }
    });
    console.log("Coin Diameter:", coinD);
    console.log("Food Width x Height:", foodWxH);
    convertPortion();
  }

  function convertPortion() {
    const scaleFactor = coinD / toonieDiamter;
    const foodScaledW = foodWxH.get[0] / scaleFactor;
    const foodScaledH = foodWxH.get[1] / scaleFactor;
    if (food.toLowerCase() == "pizza") {
      return (
        ((foodScaledW * foodScaledH * pizzaDepth) / 2).toFixed(2) // in cm^3
      )
    } else {
      return (
        (foodScaledW * foodScaledH * assumedDepth).toFixed(2) // in cm^3
      )
    }

  }

}


