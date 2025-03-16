// This is the message history
import { View, Text, FlatList } from 'react-native'
import React from 'react'
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
                backgroundColor: item.sender === 'You' ? '#e0e7ff' : '#ffffff',
                padding: 10,
                borderRadius: 10,
                marginVertical: 5,
                maxWidth: '80%',
                borderWidth: 1,
                borderColor: '#ccc',
            }}>
                <Text style = {{fontWeight: 'bold', color: item.sender === 'You' ? 'black' : 'black'}}> 
                    {item.sender}
                </Text>
                <Text>{item.text}</Text>
                <Text style = {{ fontSize: 10, color: 'gray', alignSelf: 'flex-end'}}>{item.time}</Text>
            </View>
        )}
    />
);  
}