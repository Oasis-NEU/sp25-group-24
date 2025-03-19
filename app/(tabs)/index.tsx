import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Modal, TextInput, Button } from 'react-native';
import { supabase } from '@/supabase';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const user_id = 4; // Replace with actual user ID from auth

  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventImageLink, setEventImageLink] = useState('');

  // Fetch all events on initial load
  useEffect(() => {
    getAllEvents();
  }, []);

  // Function to fetch all events
  async function getAllEvents() {
    const { data, error } = await supabase.from('Events').select('*');
    if (error) {
      console.error("Couldn't fetch events:", error);
      return;
    }
    setEvents(data);
  }

  // Function to fetch user's signed-up events
  async function getUserEvents(id: number) {
    const { data, error } = await supabase.from('SignedUp').select('*').eq('user_id', id);

    if (error) {
      console.error("Couldn't fetch user events:", error);
      return;
    }

    setUserEvents(data);
  }

  // Insert new event into the database
  async function insertEvents(name: string, date: string, time: string, description: string, image_link: string, user_id: number) {
    const { data, error } = await supabase
      .from('Events')
      .insert([{ name, date, time, description, image_link }])
      .select()
      .single();

    if (error) {
      console.error(error.message);
      return;
    }

    console.log('Event Inserted', data);

    const { error: SignedUpError } = await supabase
      .from('SignedUp')
      .insert([{ user_id, event_id: data.id, is_host: true }]);

    if (SignedUpError) {
      console.error(SignedUpError.message);
    } else {
      console.log('Added to SignedUp');
    }

    getAllEvents(); // Refresh events list
  }

  // Delete an event
  async function deleteEvents(id: number) {
    const { error } = await supabase.from('Events').delete().eq('id', id);
    if (error) {
      console.error("Couldn't delete event:", error);
    } else {
      console.log('Event Deleted');
      getAllEvents(); // Refresh events list
    }
  }

  function goToNextEvent() {
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    } else {
      setCurrentEventIndex(-1); // No more events
    }
  }

  function handleAddEvent() {
    insertEvents(eventName, eventDate, eventTime, eventDescription, eventImageLink, user_id);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      {/* Plus Icon to Add Event */}
      <TouchableOpacity style={styles.plusIcon} onPress={() => setModalVisible(true)}>
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
          <TouchableOpacity style={[styles.button, styles.yButton]} onPress={() => Alert.alert('Y pressed')}>
            <Text style={styles.buttonText}>Join!</Text>
          </TouchableOpacity>

          {/* Not Interested Button */}
          <TouchableOpacity
            style={[styles.button, styles.xButton, currentEventIndex === -1 && styles.disabledButton]}
            onPress={() => goToNextEvent()}
            disabled={currentEventIndex === -1}
          >
            <Text style={styles.buttonText}>Not Interested</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal to Add Event */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Event</Text>

            <Text style={styles.inputLabel}>Event Name</Text>
            <TextInput style={styles.input} placeholder="Enter event name" value={eventName} onChangeText={setEventName} />

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput style={styles.input} placeholder="Enter event description" value={eventDescription} onChangeText={setEventDescription} />

            <Text style={styles.inputLabel}>Date</Text>
            <TextInput style={styles.input} placeholder="Enter event date" value={eventDate} onChangeText={setEventDate} />

            <Text style={styles.inputLabel}>Time</Text>
            <TextInput style={styles.input} placeholder="Enter event time" value={eventTime} onChangeText={setEventTime} />

            <Text style={styles.inputLabel}>Image URL</Text>
            <TextInput style={styles.input} placeholder="Enter image URL" value={eventImageLink} onChangeText={setEventImageLink} />

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
    backgroundColor: '#e63946' 
  },
  plusIcon: { 
    position: 'absolute', 
    top: 20, 
    right: 20 
  },
  rectangle: { 
    width: 300, 
    height: 500, 
    backgroundColor: 'grey', 
    borderRadius: 10, padding: 20, 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  title: { 
    fontSize: 30, 
    fontWeight: '800', 
    color: 'black', 
    marginBottom: 10 
  },
  topSection: { 
    alignItems: 'center', 
    width: '100%' 
  },
  imagePlaceholder: { 
    width: '100%', 
    height: 150, 
    backgroundColor: '#d3d3d3', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  imageText: { 
    color: 'black', 
    fontSize: 16 
  },
  description: { 
    fontSize: 20, 
    color: 'black', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    position: 'absolute', 
    bottom: 20 
  },
  button: { 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 5 
  },
  yButton: { 
    backgroundColor: '#4CAF50' 
  },
  xButton: { 
    backgroundColor: '#FF5733' 
  },
  buttonText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white' 
  },
});