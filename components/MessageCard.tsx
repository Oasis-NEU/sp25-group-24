// This is the components inside the chat List or chat.tsx file

import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';


const MessageCard = ({name, message, time, count, image, onPress}:any) => {
  return (
    // TouchableOpacity allows the user to press the things below
    // Button contains left and right container for everything, can be use as TouchableOpacity(button)
    <TouchableOpacity onPress ={onPress} style ={styles.button}> 
      <View style ={styles.leftContainer}>
        <Image source= {image} style={styles.image}/>
        <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.message}>{message || " "}</Text>
        </View>
      </View>

      <View style ={styles.rightContainer}>
        <Text style={styles.time}>{time}</Text> 
        {!!count && ( // if using !! indicates that if count is not 0, then message countainer 
                      // and message Count will show. otherwise it will not
          <View style={styles.messageCountContainer}>
            <Text style={styles.messageCount}>{count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

// CSS file

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // This is the container that have all of the chat window
  // Have left and right container
    button:{
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between",
      paddingHorizontal: scale(20),
      paddingVertical: verticalScale(20),
      gap: scale(20),
      position: "relative",
      width: "100%",
      backgroundColor: "#F8FAFF",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 2,
      
    },

    // Below are the styling for name, image, message, etc...
    image:{
      height: moderateScale(53),
      width: moderateScale(53),
      borderRadius: moderateScale(53),
    },
    name:{
      fontWeight: "bold",
      fontSize: moderateScale(14),
      color: "black",
    },
    message:{
      fontSize: moderateScale(13),
      color:"gray",
      fontWeight: "500",
    },
    time:{
      color: "#8B4290",
      fontWeight: "bold",
      fontSize: moderateScale(12),
    },

    // this the little bubble with how many messages you have with messageCount inside it
    messageCountContainer:{
      backgroundColor: "#8B4280",
      width: moderateScale(22),
      height: moderateScale(22),
      borderRadius: moderateScale(22),
      justifyContent: "center",
      alignItems: "center",
    },
    messageCount:{
      color: "white",
      fontSize: moderateScale(12),
    },

    // This holds the name, text, and image
    leftContainer:{
      flexDirection: "row",
      alignItems: "center",
      gap: scale(10),
      marginRight: scale(60),
    },

    //This holds time, messageContainer
    rightContainer:{
    alignItems: "center", 
    gap: verticalScale(7),

    },

    searchContainer: {
      backgroundColor: "#EEE",
      borderRadius: 20,
      padding: 10,
      marginHorizontal: 20,
      marginVertical: 10,
    },

    searchInput: {
      fontSize: moderateScale(14),
      color: "black",
    },
});


export default MessageCard

// working on a search bar in chat room. Status: in progress....
// working on the chat room. Status: in progress...