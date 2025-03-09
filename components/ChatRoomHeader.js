import { View, Text, TouchableOpacity, Platform} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft} from "lucide-react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../components/utils/common'

const ios = Platform.OS =='ios';

export default function ChatRoomHeader({name}) {
    const router = useRouter();
    const {top} = useSafeAreaInsets();

    return (
      <View style={{ paddingTop: ios? top: top + 10, flexDirection: "row", justifyContent: "space-between", alignItems:"center", paddingHorizontal: 15, backgroundColor: "#BB9DBB" }}>

    {/* Back button, this is a comment example inside a return statement */}
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10}}>
              <ArrowLeft size={24} color="black" />
          </TouchableOpacity>
    
    {/* Chat room name */}
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>{name}</Text>

    {/* profile image, load the image of the person you are talking to*/}
          <Image
              style = {{height: hp(4.3), aspectRatio: 1, borderRadius: 100}}
              source = 'https://th.bing.com/th/id/OIP.6vzIcJQnHVyA2HMmlbW1mAHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'
              placeholder={blurhash}
              transition={500}
          />
      </View>
    );
}