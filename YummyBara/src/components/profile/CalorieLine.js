import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {CalorieDay} from "./Timeframe/CalorieDay"
import {CalorieMonth} from "./Timeframe/CalorieMonth"
import {CalorieWeek} from "./Timeframe/CalorieWeek"

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

//   const lineData = [
//     { value: 4, label: 'Mon' },
//     { value: 14, label: 'Tues' },
//     { value: 8, label: 'Wed' },
//     { value: 38, label: 'Thurs' },
//     { value: 36, label: 'Fri' },
//     { value: 28, label: 'Sat' },
//     { value: 14, label: 'Sun' },
//   ];

  const yAxisLabels = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000];

  const showOrHidePointer = (ind) => {
    ref.current?.scrollTo({
      x: ind * 200 - 25, // adjust as per your UI
    });
  };

  return (
    <View>
      {lineD ? (
      <View>
        <View style={{ flexDirection: 'row', marginLeft: 8 }}>
        {lineD.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                padding: 6,
                margin: 4,
                backgroundColor: '#ebb',
                borderRadius: 8,
              }}
              onPress={() => showOrHidePointer(index)}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <LineChart
        scrollRef={ref}
        data={lineD}
        initialSpacing={0}
        yAxisLabels={yAxisLabels}
        yAxisSuffix="calories"
        rotateLabel
      /> 
      
      </View>) : ( <View>
        <Text>Loading user data...</Text>
        </View>
      )}
    </View>
  );
};


