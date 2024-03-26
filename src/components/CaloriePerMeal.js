import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Color from './Color'

// Call <CaloriePerMeal meal="Snack" cal={300} /> from Home Screen!!!!!
// Replace "snack" and {300} w/ the correct values

const CaloriePerMeal = props => {
  return (
    <View>
      {props.meal === 'Breakfast' || props.meal === 'Dinner' ? (
        <View style={styles.containerY}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>{props.meal}</Text>
            <Text style={styles.textRight}>{props.cal} cal</Text>
          </View>
        </View>
      ) : (
        <View style={styles.containerP}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>{props.meal}</Text>
            <Text style={styles.textRight}>{props.cal} cal</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  containerY: {
    backgroundColor: Color.tabYellow,
    borderWidth: 5,
    padding: 18,
    marginTop: 16,
    marginHorizontal: 14,
    borderRadius: 25,
    borderColor: Color.tabOutlineYellow
  },
  containerP: {
    backgroundColor: Color.tabPink,
    borderWidth: 5,
    padding: 18,
    marginTop: 16,
    marginHorizontal: 14,
    borderRadius: 25,
    borderColor: Color.tabOutlinePink
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textLeft: {
    color: Color.textBrown,
    fontSize: 18,
    fontWeight: 'bold'
  },
  textRight: {
    color: Color.textBrown,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default CaloriePerMeal
