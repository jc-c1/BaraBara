import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import Color from './Color';

// Call <<CalorieGoalBar remain={800} goal={2000} consumed={1200} /> from Home Screen!!!!!
// Replace {XXX} w/ the correct values

const CalorieGoalBar = (props) => {
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
                <Text style={styles.num}>{props.remain}</Text><Text style={styles.text}>Remaining</Text>
            </View>

            <View style={{ width: 65 }} />
            <View style={styles.box}>
                <Text style={styles.num}>{props.goal}</Text><Text style={styles.text}>Goal</Text>
            </View>
            <View style={{ width: 65 }} />

            <View style={styles.box}>
                <Text style={styles.num}>{props.consumed}</Text><Text style={styles.text}>Consumed</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Color.tabPink,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    text: {
        color: Color.textBrown,
        fontWeight: '700',
        fontSize: 14,
    },
    num: {
        color: Color.textBrown,
        fontWeight: '800',
        fontSize: 18,
    },
    box: {
        alignItems: 'center',
    },
})

export default CalorieGoalBar;