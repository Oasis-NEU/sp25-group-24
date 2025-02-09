import { View, Text, StyleSheet } from 'react-native';
import MessageCard from '../components/MessageCard';

export default function Tab() {
  return (
    <View style={styles.container}>
      <MessageCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
