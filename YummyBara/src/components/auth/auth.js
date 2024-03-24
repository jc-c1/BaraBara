import { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Text
} from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'

import { LogIn } from './logIn'
import { SignUp } from './signUp'
import { PageNavigation } from '../PageNavigation'
import Color from '../Color'

import { auth } from '../../config/firebase'
import { LinearGradient } from 'expo-linear-gradient'

export const Auth = () => {
  // const user = auth.currentUser;
  const [user, setUser] = useState(null)
  const logoImg = require('../../../assets/Img/CapybaraLogo.png')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  const toAuth = () => {
    return (
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View style={styles.safecontainer}>
          <LinearGradient
            // Background Linear Gradient

            style={styles.totalcontainer}
            colors={[
              Color.grandientOrange,
              '#F4B995',
              '#FBDDBC',
              Color.gradientBeige,
              Color.gradientWhite,
              Color.gradientBeige,
              '#FFB3A5',
              '#FF958F',
              Color.gradientPink
            ]}
            start={{ x: 0.15, y: 0.15 }}
            end={{ x: 0.75, y: 0.85 }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={logoImg}
                style={styles.logoImage}
                resizeMode='cover'
              />
              <View style={styles.alignContainer}>
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageText}>YummyBara</Text>
                </View>
              </View>
            </View>

            <View style={styles.containerBox}>
              {page == 'login' ? (
                <LogIn setPage={setPage} />
              ) : (
                <SignUp setPage={setPage} />
              )}
            </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const handleOutsideClick = () => {
    Keyboard.dismiss()
  }
  const [page, setPage] = useState('login')
  return user ? <PageNavigation /> : toAuth()
}

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    alignItems: 'center',
  },
  totalcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 0,
    width: '150%'
  },
  preview: {
    marginBottom: -300,
    marginTop: 40,
    resizeMode: 'contain',
    height: 200
  },
  logoImage: {
    width: 250,
    height: 250
  },
  imageText: {
    color: Color.navPink,
    fontSize: 36,
    // fontFamily: 'Combo',
    fontWeight: 'bold'
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 5,
    alignItems: 'center',
    width: 280,
    height: 53,
    backgroundColor: Color.gradientWhite,
    borderRadius: 30,
    shadowColor: Color.gradientPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    justifyContent: 'center'
  },
  imageContainer: {
    paddingTop: 40
  },
  alignContainer: {
    alignItems: 'center'
  },
  containerBox: {
    width: '80%',
    maxWidth: 350,
    maxHeight: 350,
    backgroundColor: '#F7F2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A8853441',
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
