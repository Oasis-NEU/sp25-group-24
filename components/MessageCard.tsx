import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';


const MessageCard = () => {
  return (
    // TouchableOpacity allows the user to press the things below
    // Button contains left and right container for everything, can be use as TouchableOpacity(button)
    <TouchableOpacity style ={styles.button}> 
      <View style ={styles.leftContainer}>
        <Image src='../assets/images/react-logo.png' style={styles.image}/>
        <View>
            <Text style={styles.name}>App Member Name</Text>
            <Text style={styles.message}>Hi, how are you?</Text>
        </View>
      </View>

      <View style ={styles.rightContainer}>
        <Text style={styles.time}>12:00 pm</Text> 
        <View style={styles.messageCountContainer}>
            <Text style={styles.messageCount}>1</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

// CSS file

const styles = StyleSheet.create({
  // This is the container that have all of the chat window
  // Have left and right container
    button:{
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between",
      paddingHorizontal: scale(20),
      paddingVertical: verticalScale(10),
      gap: scale(40),
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
      color: "blue",
      fontWeight: "bold",
      fontSize: moderateScale(12),
    },

    // this the little bubble with how many messages you have with messageCount inside it
    messageCountContainer:{
      backgroundColor: "navy",
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
})


export default MessageCard