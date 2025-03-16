import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text} from 'react-native';
import { Image } from 'expo-image';
import { supabase } from '@/supabase';

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const user_id = 4; // Replace this with the actual user ID from auth

  useEffect(() => {
    async function getAllEvents() {
      const { data, error } = await supabase.from('Events').select('*');
      if (error) {
        console.error("Couldn't fetch events:", error);
        return;
      }
      setEvents(data);
  
    }

    async function insertEvents (name: string, date: string, time: string, description: string, image_link: string, user_id: number) {
      const{ data, error } = await supabase
        .from("Events")
        .insert({
          name: name,
          date: date,
          time: time,
          description: description,
          image_link: image_link
        })
        .select()
        .single()
    
        if (error) {
          console.error(error.message)
        }
    
        console.log("Event Inserted", data)
    
    
        const{ data: SignedUpData, error: SignedUpError} = await supabase
        .from("SignedUp")
        .insert({
          user_id: user_id,
          event_id: data.id,
          is_host: true
        })
    
        if (SignedUpError) {
          console.error(SignedUpError.message)
        }
    
        console.log("Added to SignedUp")
    
     }
    
    getAllEvents();
    console.log("Events" + events)
  }, []);

  async function joinEvent(event_id: number) {
   const joinedEvents = [];
   joinedEvents.push({currentEvent})
    goToNextEvent();
    console.log(joinedEvents)
  }

  function goToNextEvent() {
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    } else {
      setCurrentEventIndex(-1); 
    }
  }
  

  if (events.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No events available.</Text>
      </View>
    );
  }

  const currentEvent =
  currentEventIndex === -1 || events.length === 0
    ? { name: "No more events available", description: "", image_link: "" }
    : events[currentEventIndex];


  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <View style={styles.topSection}>
          <Text style={styles.title}>{currentEvent.name}</Text>
          <View>
          <Image
  source={{ uri: currentEvent.image_link }}
  style={{ width: 200, height: 200 }}
/>

          </View>
          <Text style={styles.description}>{currentEvent.description}</Text>
        </View>

        <View style={styles.buttonContainer}>
  <TouchableOpacity
    style={[styles.button, styles.yButton, currentEventIndex === -1 && styles.disabledButton]}
    onPress={() => currentEventIndex !== -1 && joinEvent(currentEvent.id)}
    disabled={currentEventIndex === -1}
  >
    <Text style={styles.buttonText}>Join!</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.button, styles.xButton, currentEventIndex === -1 && styles.disabledButton]}
    onPress={() => currentEventIndex !== -1 && goToNextEvent()}
    disabled={currentEventIndex === -1}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageText: {
    color: 'black',
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  rectangle: {
    width: 300,
    height: 500,
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  disabledButton: {
    backgroundColor: 'grey', 
    opacity: 0.5, 
  }
});