import { View, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Image } from 'expo-image';
import { blurhash } from '../components/utils/common'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Entypo, Ionicons} from '@expo/vector-icons';


export default function Roomheader({ name, image, router }) {

  let imageSource = image; // Check if image is a URL or local asset
  if (!image?.uri) {
    imageSource = require("../assets/images/react-logo.png"); // Default image
  }

  return (
    <Stack.Screen
        options={{
            title: '',
            headerShadowVisible: false,

            //left side of the header
            headerLeft: ()=>(
            // in the top left
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>

                  {/* Arrow to go back */}
                    <TouchableOpacity onPress={() => router.back() }>
                        <Entypo name='chevron-left' size={hp(4)} color="#737373" />
                    </TouchableOpacity>


                    {/* Image on top */}
                    <Image
                        style = {{height: hp(4.5), aspectRatio: 1, borderRadius: 100}}
                        source = {imageSource}
                        placeholder={blurhash}
                        transition={500}
                    />

                    {/* name of user */}
                    <Text style={{ fontSize: hp(2.5), font: "medium", color: "gray" }}>{name}</Text>

              </View>
            ),
            // in the right side of the header, we have call and video call icon
            headerRight: ()=> (
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Ionicons name='call' size={hp(2.8)} color={'#737373'} /> 
                <Ionicons name='videocam' size={hp(2.8)} color={'#737373'} />
              </View>
            )
        }}
    />
  );
}
