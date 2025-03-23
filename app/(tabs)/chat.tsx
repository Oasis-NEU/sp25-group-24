// This is the Chat List Page

import { View, Text, TextInput, StyleSheet, Image, FlatList } from 'react-native';
import MessageCard from '@/components/MessageCard';
import React, { useState } from "react";
import ChatHeader from '@/components/ChatHeader';
import { useRouter } from 'expo-router'; // This is so we can go from chat to chat room
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import Auth from '@/components/Auth';


export default function Chat(): JSX.Element { // export this chat page, also Chat() is a function = independent
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>(''); // states for when put a text and when no text is entered

  const { user, loading, isAuthenticated } = useSupabaseAuth();

    // The user's data
  const data = [
    {
      id: 1, // unique ID for each chat
      image: { uri: 'https://th.bing.com/th/id/OIP.WnvHipa3xxOaxBmprw0JigAAAA?w=267&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'}, // local image format
      name:"Ethan Carter",
      message: "", // no chat history
      time: "Message", 
      messageCount: 0,
    },
    { // image from public link
      id: 2,
      image: { uri: 'https://th.bing.com/th/id/OIP.M0v8e25yKu6-jVKdTBxJ6QHaI3?w=186&h=223&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Sophia Reed",
      message: [ // this is a chat history as an array
        { id: 201, sender: "You", text: "So, are you going?", time: "08:00 AM" },
        { id: 202, sender: "Sophia", text: "Yes!", time: "08:02 AM" },
        { id: 203, sender: "You", text: "What time do you plan to leave?", time: "08:05 AM" },
        { id: 204, sender: "Sophia", text: "Maybe around 10", time: "08:07 AM" },
        { id: 205, sender: "You", text: "Alright, see you then!", time: "08:10 AM" },
        { id: 206, sender: "Sophia", text: "See you!", time: "08:12 AM" },
      ],
      time: "08:12 AM",
      messageCount: 1,
    },
    { id: 3,
      image: {uri: 'https://th.bing.com/th/id/OIP.LJsJhXuF17NsxrX9yqGUWgHaJ4?w=216&h=288&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'},
      name:"Olivia Hayes",
      message: [
        { id: 301, sender: "Olivia", text: "Yooo they're leaving", time: "09:45 AM" },
        { id: 302, sender: "You", text: "I'm cominggg", time: "09:47 AM" },
        { id: 304, sender: "You", text: "I'm like 5 minutes away ", time: "09:48 AM" },
        { id: 305, sender: "Sophia", text: "where are you?", time: "09:55 AM" },
        { id: 306, sender: "Sophia", text: "????", time: "09:57 AM" },
        { id: 307, sender: "Sophia", text: "hurryy upppp", time: "09:59 AM" },
      ],
      time: "09:59 AM",
      messageCount: 3,
    },
    {
      id: 4,
      image: { uri: 'https://th.bing.com/th/id/OIP.WbmglHBFQJtHJwLnteidUgHaK2?w=138&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Emma Louis",
      message: "Bonjour! T-es pret?", // one chat history
      time: "11:15 AM",
      messageCount: 1,
    },
    { // image from public link
      id: 5,
      image: { uri: 'https://th.bing.com/th/id/OIP.bs9UQaRNCKIjqHUI38z6cgAAAA?w=111&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Mason Turner",
      message: "Meeting in 10 min",
      time: "1:35 PM",
      messageCount: 2,
    },
    {
      id: 6,
      image: {uri: 'https://th.bing.com/th/id/OIP.-VXmJCliGcRxA6LOsnbXhAHaFM?w=247&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Liam Brooks",
      message: "Did you go last time?",
      time: "3:30 PM",
      messageCount: 4,
    },
    { // image from public link
      id: 7,
      image: { uri: 'https://th.bing.com/th/id/OIP.0Gc5yqi42dFFLQP9FiUhEQHaFc?w=231&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Lucas Bennett",
      message: "Hi, how are you",
      time: "Yesterday",
      messageCount: 2,
    },
    { 
      id: 8,
      image: {uri: 'https://th.bing.com/th/id/OIP.iC05DjIJjlRSRv0iy82pmwHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Charlotte Adams",
      message: "Ready for today?",
      time: "Yesterday",
      messageCount: 5,
    },
  ];


  // filter the data for only what is put in the search bar
  const filteredChats = data.filter((chat) => // dta.filter(..) creates a new array that name in the search query
      chat.name.toLowerCase().includes(searchText.toLowerCase())
    );

  const openchatRoom = (Chat: { // open chat room from chat file. chat file have (image....) params
    image: any;
    name: string;
    // message is passing as either a string or an array that have all these components
    message: string | {id: number; sender: string; text: string; time: string}[];
    messageCount: number;
    time: string;
  }) => {

    // have messages as always an array

    const messagesArray = Array.isArray(Chat.message)
    ? Chat.message
    : Chat.message 
      ? [{ id: Date.now(), sender: Chat.name, text: Chat.message, time: Chat.time }] 
      : [];

    router.push({
      pathname: "/chatRoom",
      params: {
        name: Chat.name,
        image: Chat.image.uri || '', // change image from an object to a string
        message: JSON.stringify(messagesArray), // convert mesaages to a string
        time: Chat.time,
      },
    });
  };


  return isAuthenticated ? (
    <View style={{flex: 1}}>

      {/* Search bar */}
      <ChatHeader searchText={searchText} setSearchText = {setSearchText} />


      <FlatList  // container for data
        data= {filteredChats} // contains new filter data also if user want to filter
        keyExtractor={(item) => item.name} // Item is the current value (chat data), index is it's position
        renderItem={({ item }) => (
          <MessageCard 
            name={item.name} 
            // if item.message is an array it takes the last message to display (per message card's command)
            // if item.message is a string, it simply display it on the screen
            message={Array.isArray(item.message) ? item.message[item.message.length - 1]?.text : item.message || ""} // Ensure message is never an empty string
            image={item.image} 
            time={item.time} 
            count={item.messageCount}
            onPress={() => openchatRoom(item)}
          />
        )}
      />
    </View>
  ) : (
        <Auth />
      );
};
