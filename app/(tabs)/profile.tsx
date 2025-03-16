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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
