import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Auth } from './src/components/auth/auth'
import Home from './src/screens/Home'
import CalorieGoalBar from './src/components/CalorieGoalBar'

export default function App () {
  return (<CalorieGoalBar />)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})