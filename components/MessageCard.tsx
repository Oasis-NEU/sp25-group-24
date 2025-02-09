import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'

const MessageCard = () => {
  return (
    <TouchableOpacity style ={styles.button}>
      <View style ={styles.leftContainer}>
        <Image src='../assets/images/react-logo.png' />
      </View>
      <View style ={styles.rightContainer}></View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    button:{},
    image:{},
    name:{},
    message:{},
    time:{},
    messageCountContainer:{},
    messageCount:{},
    leftContainer:{},
    rightContainer:{},
})


export default MessageCard