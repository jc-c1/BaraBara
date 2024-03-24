import React, { useState, useEffect } from 'react'
import { db, gAuth } from '../../config/firebase'
import { onSnapshot, collection, query, where } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { Text, View } from 'react-native'
import { getAuth } from 'firebase/auth'




export const UserInfo = () => {

    const [userData, setUserInfo] = useState(null)
    
    useEffect(() => {
      // Register firebase listeners
      
      onAuthStateChanged(gAuth, user => {
        if (user) {
          const userCol = collection(db, 'users')
          const userDoc = query(
            userCol,
            where('uid', '==', gAuth.currentUser.uid)
          )
          const unsub = onSnapshot(userDoc, user => {
            const qUser = user.docs.map(user => ({
              ...user.data(),
              id: user.id
            }))
  
            console.log(JSON.stringify(qUser))
            const info = qUser[0]
  
            console.log(info.name.first)
            setUserInfo(info)
          })
  
          return () => unsub()
        } else {
          setUserInfo({})
        }
      })
    }, [])

    
    
}