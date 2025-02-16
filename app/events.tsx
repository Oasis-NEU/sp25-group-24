import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';

export default function Events() {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.yButton]} 
            onPress={() => Alert.alert('Y pressed')}
          >
            <Text style={styles.buttonText}>Join!</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.xButton]} 
            onPress={() => Alert.alert('X pressed')}
          >
            <Text style={styles.buttonText}>Not Interested</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  rectangle: {
    width: 300,
    height: 500,
    backgroundColor: 'grey',
    borderRadius: 10,
    justifyContent: 'flex-end',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  yButton: {
    backgroundColor: '#4CAF50', 
  },
  xButton: {
    backgroundColor: '#FF5733', 
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

