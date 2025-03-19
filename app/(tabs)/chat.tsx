// This is the Chat List Page

import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import MessageCard from '@/components/MessageCard';
import { useRouter } from 'expo-router'; // This is so we can go from chat to chat room


export default function Chat(): JSX.Element { // export this chat page, also Chat() is a function = independent
  const router = useRouter();
  
    // The user's data
  const data = [
    {
      image: { uri: 'https://th.bing.com/th/id/OIP.WnvHipa3xxOaxBmprw0JigAAAA?w=267&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'}, // local image format
      name:"Ethan Carter",
      message: "",
      time: "Start messaging",
      messageCount: 0,
    },
    { // image from public link
      image: { uri: 'https://th.bing.com/th/id/OIP.M0v8e25yKu6-jVKdTBxJ6QHaI3?w=186&h=223&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Sophia Reed",
      message: "Good morning!",
      time: "08:00 AM",
      messageCount: 1,
    },
    {
      image: {uri: 'https://th.bing.com/th/id/OIP.LJsJhXuF17NsxrX9yqGUWgHaJ4?w=216&h=288&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'},
      name:"Olivia Hayes",
      message: "So excited for this! ",
      time: "09:30 AM",
      messageCount: 3,
    },
    {
      image: { uri: 'https://th.bing.com/th/id/OIP.WbmglHBFQJtHJwLnteidUgHaK2?w=138&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Emma Louis",
      message: "Bonjour! T-es pret?",
      time: "11:15 AM",
      messageCount: 1,
    },
    { // image from public link
      image: { uri: 'https://th.bing.com/th/id/OIP.bs9UQaRNCKIjqHUI38z6cgAAAA?w=111&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Mason Turner",
      message: "Meeting in 10 min",
      time: "1:35 PM",
      messageCount: 2,
    },
    {
      image: {uri: 'https://th.bing.com/th/id/OIP.-VXmJCliGcRxA6LOsnbXhAHaFM?w=247&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Liam Brooks",
      message: "Did you go last time?",
      time: "3:30 PM",
      messageCount: 4,
    },
    { // image from public link
      image: { uri: 'https://th.bing.com/th/id/OIP.0Gc5yqi42dFFLQP9FiUhEQHaFc?w=231&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Lucas Bennett",
      message: "Hi, how are you",
      time: "Yesterday",
      messageCount: 2,
    },
    {
      image: {uri: 'https://th.bing.com/th/id/OIP.iC05DjIJjlRSRv0iy82pmwHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"Charlotte Adams",
      message: "Ready for today?",
      time: "Yesterday",
      messageCount: 5,
    },
  ];

  const openchatRoom = (Chat: { // open chat room from chat file. chat file have (image....) params
    image: any;
    name: string;
    message: string;
    messageCount: number;
    time: string;
  }) => {

    router.push({
      pathname: "/chatRoom",
      params: {
        name: Chat.name,
        image: Chat.image.uri, // change image from an object to a string
        message: Chat.message,
        time: Chat.time,
      },
    });
  };


  return (
    <View style={{flex: 1}}>
      <FlatList  // container for data
        data= {data} 
        keyExtractor={(item) => item.name} // Item is the current value (chat data), index is it's position
        renderItem={({ item }) => (
          <MessageCard 
            name={item.name} 
            message={item.message || "Start messaging"} // Ensure message is never an empty string
            image={item.image} 
            time={item.time} 
            count={item.messageCount}
            onPress={() => openchatRoom(item)}
          />
        )}

      />
    </View>
  );
};
