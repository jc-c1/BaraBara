import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore"; // Make sure all these are imported
import { db } from "../config/firebase.js"; // Check this path is correct as per your project structure
import CalorieGoalBar from "../components/CalorieGoalBar.js";
import CaloriePerMeal from "../components/CaloriePerMeal.js";
import Color from "../components/Color.js";

function Home() {
  const logoImg = require('../../assets/Img/CapybaraLogo.png')
  return (
    <View style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logoImage}
        resizeMode='cover'
      />
      <CalorieGoalBar remain={38} goal={2712} consumed={2674} />
      <CaloriePerMeal meal="Breakfast" cal={255} />
      <CaloriePerMeal meal="Lunch" cal={830} />
      <CaloriePerMeal meal="Dinner" cal={1482} />
      <CaloriePerMeal meal="Snack" cal={107} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fffced',
  },
  fullText: {
    backgroundColor: 'rgba(255,255,255,0.6)', // Semi-translucent black background
    borderRadius: 15,
    padding: 20,
    margin: -80,
    marginTop: 10,
    marginBottom: -40,
  },
  logoImage: {
    width: 250,
    height: 250,
    marginTop: -5,
    marginBottom: -20,
    alignSelf: 'center',
  },
});

export default Home;