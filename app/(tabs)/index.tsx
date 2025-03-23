import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Modal, TextInput, Button, ScrollView, Image } from 'react-native';
import { supabase } from '@/supabase';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import Auth from '@/components/Auth';

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventImageLink, setEventImageLink] = useState('');

  
  const { user, loading, isAuthenticated } = useSupabaseAuth();
 
  useEffect(() => {
    getAllEvents();
  }, []);

  async function getAllEvents() {
    const { data, error } = await supabase.from('Events').select('*');
    if (error) {
      console.error("Couldn't fetch events:", error);
      return;
    }
    setEvents(data);
  }

  const handleAddEvent = async () => {
    const { data, error } = await supabase.from('Events').insert([
      {
        name: eventName,
        description: eventDescription,
        date: eventDate,
        time: eventTime,
        image_link: eventImageLink,
      },
    ]);

    if (error) {
      console.error('Error adding event:', error.message);
      return;
    }

    setModalVisible(false);
    setEventName('');
    setEventDescription('');
    setEventDate('');
    setEventTime('');
    setEventImageLink('');
    getAllEvents();
  };

  function goToNextEvent() {
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    } else {
      setCurrentEventIndex(-1);
    }
  }

  async function joinEvent(event_id: number) {
    const joinedEvents = [];
    const currentEvent = events.find(event => event.id === event_id);
    if (currentEvent) {
      joinedEvents.push(currentEvent);
      console.log(joinedEvents);
    }
    goToNextEvent();
  }

  return isAuthenticated ? (
    <View style={styles.container}>
      {/* Add Event Button */}
      <TouchableOpacity style={styles.plusIcon} onPress={() => setModalVisible(true)}>
        <Icon name="add-circle" size={40} color="black" />
      </TouchableOpacity>

      {/* If no events, just display text */}
      {events.length === 0 ? (
        <Text>No events available.</Text>
      ) : (
        <View style={styles.rectangle}>
          <View style={styles.topSection}>
            <Text style={styles.title}>{events[currentEventIndex]?.name}</Text>
            <Image
              source={{ uri: events[currentEventIndex]?.image_link }}
              style={styles.eventImage}
              resizeMode="contain"
            />
            <ScrollView style={{ maxHeight: 150 }}>
              <Text style={styles.description}>{events[currentEventIndex]?.description}</Text>
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.yButton,
                currentEventIndex === -1 && styles.disabledButton,
              ]}
              onPress={() => joinEvent(events[currentEventIndex]?.id)}
              disabled={currentEventIndex === -1}
            >
              <Text style={styles.buttonText}>Join!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.xButton,
                currentEventIndex === -1 && styles.disabledButton,
              ]}
              onPress={goToNextEvent}
              disabled={currentEventIndex === -1}
            >
              <Text style={styles.buttonText}>Not Interested</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Add Event Modal */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Event</Text>

            <TextInput style={styles.input} placeholder="Event Name" value={eventName} onChangeText={setEventName} />
            <TextInput style={styles.input} placeholder="Description" value={eventDescription} onChangeText={setEventDescription} />
            <TextInput style={styles.input} placeholder="Date" value={eventDate} onChangeText={setEventDate} />
            <TextInput style={styles.input} placeholder="Time" value={eventTime} onChangeText={setEventTime} />
            <TextInput style={styles.input} placeholder="Image URL" value={eventImageLink} onChangeText={setEventImageLink} />

            <View style={styles.modalButtonContainer}>
              <Button title="Add Event" onPress={handleAddEvent} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  ) : (
    <Auth />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e63946',
  },
  plusIcon: { 
    position: 'absolute', 
    top: 20, 
    right: 20 
  },
  rectangle: { 
    width: 300, 
    height: 500, 
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderWidth: 2,
    borderColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
  },
  topSection: {
    marginBottom: 10,
    alignItems: 'center',
    flexGrow: 1,  
    flexShrink: 0,  
  },
  description: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
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
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { 
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  yButton: {
    backgroundColor: '#4CAF50',
  },
  xButton: {
    backgroundColor: '#FF5733',
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  modalButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventImage: {
    width: 300,
    height: 250,
    marginBottom: 20,
  },
});

