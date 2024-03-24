import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { signOut } from 'firebase/auth'
import Color from '../Color'
import { auth } from '../../config/firebase'

export const SignOutButton = () => {
  const logoImg = require('../../../assets/Img/CapybaraLogo.png')
  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log('Successfully logged out')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={logoImg} style={styles.logoImage} resizeMode='cover' />
      </View>
      <View style={styles.alignContainer}>
        <View style={styles.imageOverlay}>
          <TouchableOpacity style={styles.LogInBox} onPress={signout}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 18,
                textAlign: 'center'
              }}
            >
              Sign out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  LogInBox: {
    // alignItems: 'center',
    // justifyContent: 'center',
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
    shadowRadius: 3,
    maxWidth: 120
  },
  imageContainer: {
    paddingBottom: 15
  },
  logoImage: {
    width: 120,
    height: 120
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  alignContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})
