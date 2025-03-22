// This is the chat room page

import {View, Text, Image, TextInput, TouchableOpacity, Dimensions, GestureResponderEvent } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Roomheader from "../components/Roomheader";
import { useRouter } from 'expo-router';
import MessageList from "../components/MessageList";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';
import {Feather} from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width; // get screen width

export default function ChatRoom() {
    const {name, image, message} = useLocalSearchParams();
    const router = useRouter();
    
    // receive message from Chat.tsx
    // pass the message as string or array depending on what it already was
    const parsedMessage = (() => { 
        try {
            return typeof message === "string" ? JSON.parse(message) : message;
        } catch (error) {
            console.error("Failed to parse message:", error);
            return [];
        }
    })();


     // get the messages content from the message in chat.tsx and store locally
    const [messages, setMessages] = useState<
     { id: Number; sender: String; text: String; time: string }[]
    >(parsedMessage || []);

    const [text, setText] = useState(''); // the state of the text input
    const [currentUser, setCurrentUser] = useState('You'); // default sender is You

    // handle the states of the message
    const handleSendMessage = () => {
        if (text.trim() === '') return; // if there's nothing in text box, don't send

        // creating a new message 
        const newMessage = {
            id: Date.now() + Math.random(), // unique id fo message based on current time
            sender: currentUser, 
            text: text,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), // get current time
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);


        setText(''); // new state of text went from the previous typed answer to an empty field
    };

    const handleTapToSwitchUser = (event: GestureResponderEvent) => {
        const touchX = event.nativeEvent.locationX;
        const newUser = touchX < screenWidth / 2 ?String(name) : 'You';
        setCurrentUser(newUser);
    }

    let imageSource = { uri: image};
    if (!image || typeof image !== "string") {
        imageSource = require("../assets/images/react-logo.png");
      }
    

    return (
        <TouchableOpacity
            style={{flex: 1, backgroundColor:"#f5f5f5"}}
            activeOpacity={1}
            onPress={handleTapToSwitchUser}
        >

            <StatusBar style="dark"/>
            <Roomheader name={name} image={imageSource} router ={router} /> {/* remove the chatRoom title, and pass the header in RoomHeader */}

            {/* Shadow bar under the header */}
            <View style={{height: 3, borderBottomWidth: 1, borderBottomColor:'#d1d5db' }}/>

            {/* box that contains message history and new messages */}
            <View style={{flex: 1, backgroundColor:'#f5f5f5', padding: 15}}>

                {/* Shows message history */}
                <MessageList messages={messages} /> {/* messageList have the past messages component */}

                {/* inputing text and send */}
                <View style={{marginBottom: hp(2.7), paddingTop: 8 }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginHorizontal: 12}}>

                        {/* styling for for text input and send */}
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderWidth: 1, padding: 8, borderColor: '#d1d5db',  borderRadius: 999, paddingLeft: 20, flex: 1, marginRight: 8}}>
                            <TextInput
                                placeholder='Type message as'
                                style= {{fontSize: hp(2), flex: 1}}
                                value = {text}
                                onChangeText={setText}
                            />

                            <TouchableOpacity // circle for send feauture
                                style={{backgroundColor: '#e5e7eb', padding: 10, borderRadius: 50 }}
                                onPress = {handleSendMessage}
                            >
                                    <Feather name='send' size={hp(3.0)} color='#737373' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}