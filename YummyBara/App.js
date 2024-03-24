import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Auth } from './src/components/auth/auth'
import Home from './src/screens/Home'
import CalorieGoalBar from './src/components/CalorieGoalBar'
import CaloriePerMeal from './src/components/CaloriePerMeal'

export default function App () {
  return (
    <Auth />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})