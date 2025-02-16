import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { supabase } from '@/supabase';

export default function Events() {
  const [events, setEvents] = useState<any>([])
  const [userEvents, setUserEvents] = useState<any>([])

 async function getAllEvents() {
  const {data, error} = await supabase
  .from('Events')
  .select('*')

  if(error) {
    return "Couldn't fetch events."
  }

  setEvents(data);
  return events
 }

 async function getUserEvents(id: number) {
  const{data, error} = await supabase
  .from("SignedUp")
  .select("*")
  .eq("user_id", id)

  if(error) {
    return "No Events. Go to event page to sign up!"
  }

  setUserEvents(data)
  return userEvents
 }


 useEffect(function() {
  async function getAllEvents() {
    const {data, error} = await supabase
    .from('Events')
    .select('*')
  
    if(error) {
      return "Couldn't fetch events."
    }
  
    setEvents(data);
    return events
   }
  
   async function getUserEvents(id: number) {
    const{data, error} = await supabase
    .from("SignedUp")
    .select("*")
    .eq("user_id", id)
  
    if(error) {
      return "No Events. Go to event page to sign up!"
    }
  
    setUserEvents(data)
    return userEvents
   }


   // add this to profile later getUserEvents()
   getAllEvents().catch((err) => console.error(err))
   console.log(events)
 }, [])


  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
      <View style={styles.topSection}>
      <Text style={styles.title}>Event Title</Text>
      <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Placeholder</Text>
        </View>
        <Text style={styles.description}>This is the event description.</Text>
        </View>

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
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#d3d3d3',
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
});

