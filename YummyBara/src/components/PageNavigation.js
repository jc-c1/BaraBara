import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import Profile from "../screens/Profile"
import Home from '../screens/Home'
import CameraScreen from '../screens/CameraScreen'


const Tab = createBottomTabNavigator()


export const PageNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: '#656565',
          tabBarStyle: { backgroundColor: '#d8a7a9' }
        }}
        initialRouteName='Home'
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name='library-sharp' size={20} color={color} />
            ),
            tabBarLabel: 'Home',
            headerShown: false
          }}
        />
        <Tab.Screen
          name='SCameraScreen'
          component={CameraScreen}
          options={{
            tabBarLabel: 'CameraScreen',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='paint-brush' size={24} color={color} />
            ),
            headerStyle: { backgroundColor: '#d8a7a9' },
            headerShown: false
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name='person-sharp' size={20} color={color} />
            ),
            headerStyle: { backgroundColor: '#d8a7a9' }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}





// const MainStack = createNativeStackNavigator()
// const AdventureStack = createNativeStackNavigator()

// function MainStackScreen () {
//   return (
//     <MainStack.Navigator>
//       <MainStack.Screen
//         name='Home'
//         component={Home}
//         options={{
//           headerShown: true,
//           headerStyle: { backgroundColor: '#d8a7a9' }
//         }}
//       />
//       <MainStack.Screen
//         name='CameraScreen'
//         component={CameraScreen}
//         options={{
//           headerShown: true,
//           headerStyle: { backgroundColor: '#d8a7a9' }
//         }}
//       />
//     </MainStack.Navigator>
//   )
// }



// function AdventureStackScreen () {
//   return (
//     <AdventureStack.Navigator>
//       <AdventureStack.Screen
//         name='StoryCreator'
//         component={StoryCreatorScreen}
//         options={{
//           headerShown: true,
//           headerStyle: { backgroundColor: '#d8a7a9' },
//           title: 'Start Your Adventure!'
//         }}
//       />
//       <AdventureStack.Screen
//         name='Background'
//         component={BackImg}
//         options={{
//           headerShown: true,
//           headerStyle: { backgroundColor: '#d8a7a9' },
//           title: 'Your Adventure!',
//           headerBackTitle: 'Back'
//         }}
//       />
//     </AdventureStack.Navigator>
//   )
// }