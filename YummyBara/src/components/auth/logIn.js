import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Color from '../Color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { auth } from '../../config/firebase'

export const LogIn = ({ setPage }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Successfully logged in')
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.inputboxes}>
        <View style={styles.usernamePasswordBox}>
          <MaterialIcons name='alternate-email' size={20} color='#666' />
          <TextInput
            style={styles.inputUsername}
            onChangeText={setEmail}
            value={email}
            placeholder='Enter Email'
          />
        </View>

        <View style={styles.usernamePasswordBox}>
          <MaterialIcons name='lock' size={20} color='#666' />
          <TextInput
            style={styles.inputPassword}
            onChangeText={setPassword}
            value={password}
            placeholder='Enter Password'
            secureTextEntry={true}
          />
        </View>

        <Text style={styles.signUp}>
        {'  '}Don't have an account? {'  '}
          <Text style={styles.signUpText} onPress={() => setPage('signup')}>
            Join us!
          </Text>
        </Text>

        <View style={styles.LogInBox}>
          <TouchableOpacity style={{ flex: 1 }} onPress={loginUser}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 18,
                textAlign: 'center'
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  usernamePasswordBox: {
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 6,
    padding: 12,
    backgroundColor: '#FEFEFE',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#863441'
  },
  LogInBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 6,
    padding: 12,
    backgroundColor: Color.navPink,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#863441',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  inputUsername: {
    paddingLeft: 6,
    flex: 1
  },
  inputPassword: {
    paddingLeft: 6,
    // paddingRight: 12,
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  title: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 46,
    color: Color.textBrown
  },
  inputboxes: {
    width: 280,
    flexDirection: 'col'
  },
  signUp: {
    color: Color.accentGreenDark,
    marginBottom: 20
  },
  signUpText: {
    color: '#e8979a',
    textDecorationLine: 'underline'
  }
})
