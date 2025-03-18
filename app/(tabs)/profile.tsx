import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab [Home|Profile]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },

});
