// userProfile
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import { gAuth, db } from '../config/firebase'
import { collection, getDocs, query, where, onSnapshot, doc, getDocFromCache } from 'firebase/firestore'
import {SignOutButton} from "../components/profile/SignOutButton"
import { UserInfo } from '../components/profile/UserInfo'
import {CalorieLine} from "../components/profile/CalorieLine"
import { onAuthStateChanged } from 'firebase/auth'
import Color from '../components/Color'
/* global require */

export default function Profile() {
  const logoImg = require('../../assets/Img/CapybaraLogo.png')
  const logoObama = require('../../assets/obama.jpeg')
  const [userData, setUserInfo] = useState(null)
  const [calTrack, setCalTrack] = useState([])
  
    useEffect(() => {
      // Register firebase listeners
      
      onAuthStateChanged(gAuth, async(user) => {
        if (user) {
          const userCol = collection(db, 'users')
          const userDoc = query(
            userCol,
            where('uid', '==', gAuth.currentUser.uid)
          )
          const unsub = onSnapshot(userDoc, async user => {
          const qUser = user.docs.map(user => ({
              ...user.data(),
              id: user.id
            }))
        
            // console.log(JSON.stringify(qUser))
            const info = qUser[0]
            

            const docID = info.id
            
          
            // Query a reference to a subcollection
            const querySnapshot = await getDocs(collection(db, "users", info.id, "calTracks"));
            
            let calories = []
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              calories.push(doc.data())
              
              // console.log(doc.id, " => ", doc.data());
            });
            setCalTrack(calories)

            
            // console.log(info.name.first)
            setUserInfo(info)
          })
  
          return () => unsub()
        } else {
          setUserInfo({})
        }
      })
    }, [])

    console.log(calTrack)

  return (
<View>
    {userData ? (
      <View>
      <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.namePic}>

        <Image source={logoObama}
          style={styles.logoImage}
          resizeMode='cover' />
          <View style={{ width: 15 }} />
          <View>
        <UserInfo style={styles.userInfo} />
        <View style={styles.rowContainer}>
            <Text style={styles.textLeft1}>Joined</Text>
            <Text style={styles.textRight1}>Mar 22, 2024</Text>
            </View>
        </View>
        

        </View>
        

        <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Achievement</Text>
            <Text style={styles.textRight}>-8.7kg</Text>
        </View>

        <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Target Weight</Text>
            <Text style={styles.textRight}>65.2kg</Text>
        </View>

      </View>
      <CalorieLine u = {calTrack}/>

      <View style={styles.Location}>
        <SignOutButton />
      </View>
    </View>
    ) : (
      <Text>Loading user data...</Text>
    )}
    </View>
  )
  //   const [userDetails, setUserDetails] = useState(null)
  //   const userUID = auth.currentUser.uid
  //   const backgroundImg = require('../../assets/Img/ProfileBackground.png')
  //   const profileImg = require('../../assets/Img/TeddyProfileImg.png')

  //   useEffect(() => {
  //     const fetchUserDetails = async () => {
  //       const q = query(collection(db, 'Users'), where('uid', '==', userUID))
  //       const querySnapshot = await getDocs(q)

  //       if (!querySnapshot.empty) {
  //         // Assuming each uid is unique, there should only be one document in the querySnapshot
  //         const docData = querySnapshot.docs[0].data() // Get data of the first document
  //         setUserDetails(docData)
  //       } else {
  //         console.log('No such user!')
  //       }
  //     }

  //     fetchUserDetails()
  //   }, [userUID])

  //   return userDetails ? (
  //     <View style={styles.container}>
  //       <ImageBackground
  //         source={backgroundImg}
  //         style={styles.backgroundImage}
  //         resizeMode='cover'
  //       >
  //         <View style={styles.profileContainer}>
  //           <Image
  //             source={profileImg}
  //             style={styles.profileImage}
  //             resizeMode='contain'
  //           />
  //         </View>
  //         <View style={styles.fullText}>
  //           <Text style={styles.textName}>
  //             {userDetails.firstName} {userDetails.lastName}
  //           </Text>
  //           <Text style={styles.boldText}>Birthday:</Text>
  //           <Text style={styles.text}>
  //             {userDetails.dob.toDate().toDateString()}
  //           </Text>
  //           <Text style={styles.boldText}>Genre Preferences:</Text>
  //           {userDetails.genrePref &&
  //             userDetails.genrePref.map((genre, index) => (
  //               <Text key={index} style={styles.text}>
  //                 {genre}
  //               </Text>
  //             ))}
  //           <Text style={styles.boldText}>Favorite Story:</Text>
  //           <Text style={styles.text}>
  //             {userDetails.favouriteStory && userDetails.favouriteStory.title}
  //           </Text>
  //           <Text style={styles.boldText}>Avoid Words:</Text>
  //           {userDetails.avoidWords &&
  //             userDetails.avoidWords.map((word, index) => (
  //               <Text key={index} style={styles.text}>
  //                 {word}
  //               </Text>
  //             ))}
  //         </View>
  //       </ImageBackground>
  //     </View>
  //   ) : (
  //     <View style={styles.container}>
  //       <ImageBackground
  //         source={backgroundImg}
  //         style={styles.backgroundImage}
  //         resizeMode='cover'
  //       >
  //         <Text>Loading</Text>
  //       </ImageBackground>
  //     </View>
  //   )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.profileBlue,
  },
  Location: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  profileCard: {
    backgroundColor: '#fffdfa',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#fcf2e3',
  },
  logoImage: {
    width: 130,
    height: 130,
    marginTop: -5,
    marginBottom: -20,
    alignSelf: 'flex-start',
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#eb938d',
  },
  rowContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLeft: {
    color: Color.textBrown,
    fontSize: 17,
    fontWeight: '700',
  },
  textRight: {
    color: Color.textBrown,
    fontSize: 17,
    fontWeight: '700',
  },
  namePic: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    
  },
  textLeft1: {
    color: Color.accentOrange,
    fontSize: 13,
    fontWeight: '600',
  },
  textRight1: {
    color: Color.accentOrange,
    fontSize: 13,
    fontWeight: '600',
  },
  
})
