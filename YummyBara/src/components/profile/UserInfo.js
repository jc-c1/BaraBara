import React, { useState, useEffect } from 'react'
import { db, gAuth } from '../../config/firebase'
import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { Text, View } from 'react-native'


export const UserInfo = (u) => {

  const uD = u
  
  const fullStringDate = uD.u.joinDate.toDate().toDateString()

  const splitDate = fullStringDate.split(" "); // Split the string by spaces
  const displayDate = splitDate.slice(1).join(" ") 
  
  // useEffect(() => {
  //   // Register firebase listeners
    
  //   onAuthStateChanged(gAuth, user => {
  //     if (user) {
  //       const userCol = collection(db, 'users')
  //       const userDoc = query(
  //         userCol,
  //         where('uid', '==', gAuth.currentUser.uid)
  //       )
  //       const unsub = onSnapshot(userDoc, user => {
  //         const qUser = user.docs.map(user => ({
  //           ...user.data(),
  //           id: user.id
  //         }))

  //         console.log(JSON.stringify(qUser))
  //         const info = qUser[0]

  //         console.log(info.name.first)
  //         setUserInfo(info)
  //       })

  //       return () => unsub()
  //     } else {
  //       setUserInfo({})
  //     }
  //   })
  // }, [])

  return (
    <View>
      {uD ? (
        <View>
          
          <Text>Name: {uD.u.name.first}{" "}{uD.u.name.last}</Text>
          <Text>Joined {"    "} {displayDate} </Text>
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  )
}
