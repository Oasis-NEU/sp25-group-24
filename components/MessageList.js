// This is the styling for each message sent
import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MessageCard from './MessageCard'

// messages contains sender, id, text, and time and messageList received those as an array
export default function MessageList({messages}) {
  return (
    <FlatList
        data = {messages} // list of messages contain
        keyExtractor={(item) => item.id.toString()} // unique id for each message
        renderItem = {({item}) => (
            <View style = {{
                alignSelf: item.sender === 'You' ? 'flex-end' : 'flex-start',
                backgroundColor: item.sender === 'You' ? '#E57373' : '#ffffff',
                padding: 10,
                borderRadius: 16,
                marginVertical: 3,
                maxWidth: '80%',
                borderWidth: 1,
                borderColor: '#ccc',
            }}>
                <Text style = {{ fontSize: hp(1.9)}}>{item.text}</Text>
                <Text style = {{ fontSize: hp(1.5), color: '#gray', alignSelf: 'flex-end'}}>{item.time}</Text>
            </View>
        )}
    />
);  
}