import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {CalorieDay} from "./Timeframe/CalorieDay"
import {CalorieMonth} from "./Timeframe/CalorieMonth"
import {CalorieWeek} from "./Timeframe/CalorieWeek"
import { LineChart } from 'react-native-gifted-charts';
import Color from "../Color"




export const CalorieLine = (u) => {
 const ref = useRef(null);
 const [lineD, setLineD] = useState(null)
//   console.log(calTrack)
  useEffect(() => {
   const calTrack = u.u;
   let lineData = calTrack.map((food) => ({value: food.calories || 2000, label: food.date.toDate().toDateString().split(" ")[0]}))
   console.log(lineData)
   setLineD(lineData)
 },[])
//   console.log(line)

console.log("aaa")
console.log(lineD)

//   const lineData = [
//     { value: 4, label: 'Mon' },
//     { value: 14, label: 'Tues' },
//     { value: 8, label: 'Wed' },
//     { value: 38, label: 'Thurs' },
//     { value: 36, label: 'Fri' },
//     { value: 28, label: 'Sat' },
//     { value: 14, label: 'Sun' },
//   ];

const chartLabel = [{label: "Day"}, {label: "Week"}, {label: "Month"}]

const yAxisLabels = ["0", "500", "1000", "1500", "2000", "2500", "3000"];


 const showOrHidePointer = (ind) => {
   ref.current?.scrollTo({
     x: ind * 200 - 25, // adjust as per your UI
   });
 };


 return (
   <View>
     {lineD ? (
     <View style={styles.container}>
       <View style={{ flexDirection: 'row', marginLeft: 120}}>
       {chartLabel.map((item, index) => {
         return (
           <TouchableOpacity
             key={index}
             style={{
               padding: 6,
               margin: 4,
               backgroundColor: Color.accentGreenDark,
               borderRadius: 8,
             }}
             onPress={() => showOrHidePointer(index)}>
             <Text style={{color: "white",}}>{item.label}</Text>
           </TouchableOpacity>
         );
       })}
     </View>


     <LineChart
       scrollRef={ref}
       data={lineD}
       color = {Color.accentGreenLight}
       initialSpacing={0}
       maxValue={3000}
       dataPointsColor={Color.accentGreenDark}
       yAxisColor="#0BA5A4"
       xAxisColor="#0BA5A4"
       noOfSections = {7}
       stepValue = {500}
       yAxisSuffix="calories"
       xAxisIndicesColor = {Color.accentGreenDark}
       yAxisIndicesColor = {Color.accentGreenDark}
       xAxisIndicesWidth= {2}
       rotateLabel
     />
    
     </View>) : ( <View>
       <Text>Loading user data...</Text>
       </View>
     )}
   </View>
 );
};




const styles = StyleSheet.create({
 container: {
   marginLeft: 40,
 }


})

