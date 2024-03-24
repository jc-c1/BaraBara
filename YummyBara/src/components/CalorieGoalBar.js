import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import Color from './Color';

export default function CalorieGoalBar() {
    const goal = 2000;
    // const [userDetails, setUserDetails] = useState(null);
    // const [breakfast, setBreakfast] = useState(null);
    // // const userUID = auth.currentUser.uid;
    // const userUID = '84j6f5CNnbcVM93x5egq1sUxzpq1';
    // const currentDate = Timestamp.now().toDate();
    // const currentDay = currentDate.getDate();
    // const currentMonth = currentDate.getMonth(); //January is 0

    // useEffect(() => {
    //     const fetchUserDetails = async () => {
    //         try {
    //             const userQuery = query(collection(db, "users"), where("uid", "==", userUID));
    //             const userQuerySnapshot = await getDocs(userQuery);

    //             if (!userQuerySnapshot.empty) {
    //                 const userData = userQuerySnapshot.docs[0].data();
    //                 setUserDetails(userData);

    //                 // Fetch breakfast from calTracks for the current day and month
    //                 const calQuery = query(collection(db, "users", userUID, "calTracks"), 
    //                     where("date", ">=", Timestamp.fromDate(new Date(currentDate.getFullYear(), currentMonth, currentDay))),
    //                     where("date", "<", Timestamp.fromDate(new Date(currentDate.getFullYear(), currentMonth, currentDay + 1)))
    //                 );
    //                 const calQuerySnapshot = await getDocs(calQuery);
    //                 calQuerySnapshot.forEach((doc) => {
    //                     const data = doc.data();
    //                     console.log(data.meal.breakfast);
    //                     if (data.meal && data.meal.breakfast) {
    //                         setBreakfast(data.meal.breakfast);
    //                     }
    //                 });
    //             } else {
    //                 console.log("No such user!");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching user details:", error);
    //         }
    //     };

    //     fetchUserDetails();
    // }, [userUID, currentDate, currentDay, currentMonth]);

    // Render your UI using userDetails and breakfast
    return (
        <View style={styles.container}>
            <View style={styles.box}>
            <Text style={styles.text}>800</Text><Text style={styles.text}>Remaining</Text>
            </View>

            <View style={{ width: 40 }} />
            <View style={styles.box}>
            <Text style={styles.text}>2000</Text><Text style={styles.text}>Goal</Text>
            </View>
            <View style={{ width: 40 }} />

            <View style={styles.box}>
            <Text style={styles.text}>1200</Text><Text style={styles.text}>Consumed</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Color.tabPink,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Color.textBrown,
        fontWeight: '800',
        fontSize: 18,
    },
    box: {
        alignItems: 'center',
    },
})
