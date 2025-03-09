// This is the chat room page

import {View, Text, Image, } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from "../components/ChatRoomHeader";

export default function ChatRoom() {
    const {name, image, message, time} = useLocalSearchParams();


    let imageSource;
    if (typeof image == "string") {
        try {
            imageSource = JSON.parse(image);
        } catch {
            imageSource = { uri: image };
        }
    } else if (Array.isArray(image) && image.length > 0) { // not multiple string
        imageSource = { uri: image[0]};
    } else {
        imageSource = image || require ("../assets/images/react-logo.png");
    }
    

    return (
        <View style={{flex: 1, backgroundColor:"white", padding: 20}}>
            <StatusBar style="dark"/>
            <ChatRoomHeader name={name || "Unknown"} />

            <View style={{flexDirection: "row", alignItems:"center", marginBottom: 10}}>
                <Image
                    source={imageSource}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10}}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold"}}>{name}</Text>
            </View>

            <Text style={{ fontSize: 16, color: "gray"}}>{message}</Text>
            <Text style={{ fontSize: 14, color: "blue", marginTop: 5}}>{time}</Text>
        </View>
    );
}