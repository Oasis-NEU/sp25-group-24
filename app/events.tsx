import { View, Text, StyleSheet, Button, Alert} from 'react-native';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab [Home|Events]</Text>
      <Button
          title="X"
          color="#f194ff"
          onPress={() => Alert.alert('X pressed')}
        />
        <Button
          title="Y"
          color="#f194ff"
          onPress={() => Alert.alert('Y pressed')}
        />
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
