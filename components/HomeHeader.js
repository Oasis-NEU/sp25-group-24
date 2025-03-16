import { View, Text, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft} from "lucide-react-native";


export default function ChatRoomHeader({name}) {
    const router = useRouter();

  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#fff", elevation: 3}}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10}}>
            <ArrowLeft size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ fonstSize: 18, fontWeight: "bold"}}>{name}</Text>
    </View>
  );
}
