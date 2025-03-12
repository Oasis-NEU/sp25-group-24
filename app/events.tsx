import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { supabase } from '../supabase';

export default function Events() {
  const [events, setEvents] = useState<any>([])
  const [userEvents, setUserEvents] = useState<any>([])


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
   }


   // add this to profile later getUserEvents()
   getAllEvents().catch((err) => console.error(err))
   console.log("EVENTS LIST:", events)
 }, [])

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

 async function deleteEvents (id: number) {
  const response = await supabase
    .from("Events")
    .delete()
    .eq('id', 1)
 }

 insertEvents("test", "10", "22", "test desv", "aaaaaa", 4)


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

