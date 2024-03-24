import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Swipeable } from "react-native-gesture-handler";

const FoodForm = ({route}) => {
    const {imageUri} = route.params;
    const {food} = route.params; // initial list of foods
    const {portion} = route.params;
    const [foodList, setFoodList] = useState(food);

    const renderRightActions = (index) => {
    
        return (
          <TouchableOpacity onPress={() => deleteItem(index)} style={styles.deleteBox}>
            <Text> </Text>
          </TouchableOpacity>
        );
      }
    
      const deleteItem = (index) => {
        const newFoodList = foodList.filter((item, idx) => idx !== index);
        setFoodList(newFoodList);
      }
    
    
      return (
        
        <View style={styles.container}>
            <Image source={muffin} style={styles.foodImage}/>
              <View style={styles.title}>
                <Text style={styles.boldText}>Food: </Text>
                <Text style={styles.boldText}>Portion: </Text>
              </View>
              <GestureHandlerRootView style={{ flex: 1 }}>
              {foodList.map((item, index) => {
                return (
                  <Swipeable key={index} renderRightActions={() => renderRightActions(index)}>
                  <View style={styles.sideBySide}>
                    <View style={styles.foodPanel}>
                        <Text>{item}</Text>
                    </View>
                    <View style={styles.portionPanel}>
                        <Text>{portion[index]}</Text>
                    </View>
                </View>
                </Swipeable>
                )
              })}
              </GestureHandlerRootView>
        </View>
        );
}

const styles = StyleSheet.create({
    title: {
      marginLeft: 65,
      flexDirection: 'row',
      width: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    foodImage: {
        width: '100%',
        height: '50%',
        alignSelf: 'flex-start',
    },
    foodPanel: {
        padding: 15,
        margin: 20,
        backgroundColor: '#FFF8D9',
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#F9CF58',
        alignItems: 'center',
        flex: 1
    },
    portionPanel: {
      padding: 15,
      margin: 20,
      backgroundColor: '#FFA2A7',
      borderRadius: 15,
      borderWidth: 3,
      borderColor: '#FD646C',
      alignItems: 'center',
      opacity: 0.8,
      flex: 1
    },
    boldText: {
      fontWeight: 'bold',
      padding: 5,
      flex: 1,
      alignItems: 'center',
    },
    sideBySide: {
      flexDirection: 'row',
      width: '100%',
      opacity: 0.8,
      marginBottom: 5
    },
  
    deleteBox: {
      backgroundColor: 'white', // Temporarily set a background color to ensure visibility
      padding: 10,
    }
  })
  