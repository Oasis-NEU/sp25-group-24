import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Modal, TextInput, Button } from 'react-native';
import { supabase } from '@/supabase';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Correct the icon import

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const user_id = 4; // Replace with the actual user ID from auth

  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventImageLink, setEventImageLink] = useState('');

  // Fetch all events on initial load
  useEffect(() => {
    getAllEvents();  // Call the function inside useEffect
  }, []);

  // Function to fetch all events
  async function getAllEvents() {
    const { data, error } = await supabase.from('Events').select('*');
    if (error) {
      console.error("Couldn't fetch events:", error);
      return;
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
      {/* Plus Icon on the top-left corner */}
      <TouchableOpacity
        style={styles.plusIcon}
        onPress={() => setModalVisible(true)} // Show modal when pressed
      >
        <Icon name="add-circle" size={40} color="black" />
      </TouchableOpacity>

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

  {/* Not Interested Button */}
  <TouchableOpacity
    style={[
      styles.button,
      styles.xButton,
      currentEventIndex === -1 && styles.disabledButton, // Apply gray style when no events
    ]}
    onPress={() => goToNextEvent()}
    disabled={currentEventIndex === -1} // Disable when no more events
  >
    <Text style={styles.buttonText}>Not Interested</Text>
  </TouchableOpacity>
</View>
      </View>

      {/* Modal to Add Event */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Add New Event</Text>

      {/* Event Name Label and Input */}
      <Text style={styles.inputLabel}>Event Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event name"
        value={eventName}
        onChangeText={setEventName}
      />

      {/* Description Label and Input */}
      <Text style={styles.inputLabel}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event description"
        value={eventDescription}
        onChangeText={setEventDescription}
      />

      {/* Date Label and Input */}
      <Text style={styles.inputLabel}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event date"
        value={eventDate}
        onChangeText={setEventDate}
      />

      {/* Time Label and Input */}
      <Text style={styles.inputLabel}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event time"
        value={eventTime}
        onChangeText={setEventTime}
      />

      {/* Image URL Label and Input */}
      <Text style={styles.inputLabel}>Image URL</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter image URL"
        value={eventImageLink}
        onChangeText={setEventImageLink}
      />

      {/* Modal Buttons */}
      <View style={styles.modalButtonContainer}>
        <Button title="Add Event" onPress={handleAddEvent} />
        <Button title="Cancel" onPress={() => setModalVisible(false)} />
      </View>
    </View>
  </View>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#e63946',
  },
  plusIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  rectangle: {
    width: 350,
    height: 500, 
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',  
    flexDirection: 'column',  
  },
  title: {
    fontSize: 30,
    fontWeight: 800,
    color: 'black',
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
    fontSize: 20,
    color: 'black',
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
    width: '100%', 
    position: 'absolute', 
    bottom: 20, 
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