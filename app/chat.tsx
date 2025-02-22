import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import MessageCard from '../components/MessageCard';

export default function Tab() {
  // The user's data
  const data = [
    {
      image: require('../assets/images/react-logo.png'), // local image format
      name:"App member name",
      message: "Hi, how are you",
      time: "12:00 pm",
      messageCount: 1,
    },
    { // image from public link
      image: { uri: 'https://th.bing.com/th/id/OIP.6vzIcJQnHVyA2HMmlbW1mAHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
      name:"App member name 2",
      message: "Hi, how are you",
      time: "Yesterday",
      messageCount: 3,
    },
    {
      image: require('../assets/images/react-logo.png'),
      name:"App member name 3",
      message: "Yo open your phone",
      time: "12:00 pm",
      messageCount: 0,
    },
  ];

  return (
    <View style={{flex: 1}}>
      <FlatList  // container for data
        data= {data} 
        keyExtractor={(item, index) => index.toString()} // Item is the current object, index is it's position
        renderItem={({item}) => ( // renderItem tells Flatlist how to style each data
          <MessageCard 
            name ={item.name} 
            message = {item.message} 
            image= {item.image} 
            time={item.time} 
            count= {item.messageCount}
          />
        )} 
      />
    </View>
  );
};
