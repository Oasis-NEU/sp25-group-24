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
  }

  // Function to add a new event
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

    console.log('Event added:', data);
    setModalVisible(false); // Close the modal after adding the event
    setEventName(''); // Reset form fields
    setEventDescription('');
    setEventDate('');
    setEventTime('');
    setEventImageLink('');
    
    // Reload events after adding
    getAllEvents();
  };

  async function joinEvent(event_id: number) {
    const joinedEvents = [];
    const currentEvent = events.find(event => event.id === event_id);
    if (currentEvent) {
      joinedEvents.push(currentEvent);
      console.log(joinedEvents);
    }
    goToNextEvent();
  }
  

  // Move to next event
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
      ? { name: "No more events available", description: "", image_link: "https://as2.ftcdn.net/v2/jpg/00/86/18/25/1000_F_86182546_Gy93hyoCFXmK0JlXYnOekv05v66MUmfb.jpg" }
      : events[currentEventIndex];

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
          <Text style={styles.title}>{currentEvent.name}</Text>
          <Image
  source={{ uri: currentEvent.image_link }}
  style={styles.eventImage}
  resizeMode="contain"
/>
          <Text style={styles.description}>{currentEvent.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
  {/* Join Button */}
  <TouchableOpacity
    style={[
      styles.button,
      styles.yButton,
      currentEventIndex === -1 && styles.disabledButton, // Apply gray style when no events
    ]}
    onPress={() => joinEvent(currentEvent.id)}
    disabled={currentEventIndex === -1} // Disable when no more events
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
    backgroundColor: '#f5f5f5',
  },
  plusIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  rectangle: {
    width: 300,
    height: 500,  // Fixed height to keep the rectangle from growing too large
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',  // Prevent content from overflowing
    flexDirection: 'column',  // Ensures content is arranged vertically
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,  // Add padding to prevent text from touching the sides
    flexShrink: 1, // Ensures the text shrinks to fit the available space
    flexGrow: 1,   // Prevents the text from expanding too much
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',  // Make sure the buttons take up full width inside the rectangle
    position: 'absolute', // Position the buttons absolutely within the rectangle
    bottom: 20,  // 20px from the bottom of the rectangle
  },
  button: {
    paddingVertical: 1,  // Reduced vertical padding to make the buttons shorter
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '45%',  // Ensure buttons are not too wide and fit inside the container
    justifyContent: 'center',  // Vertically center the text
    alignItems: 'center',  // Horizontally center the text
  },
  buttonText: {
    fontSize: 14,  // Smaller font size for the button text
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',  // Ensures the text is centered horizontally
  },
  yButton: {
    backgroundColor: '#4CAF50',
  },
  xButton: {
    backgroundColor: '#FF5733',
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
  topSection: {
    marginBottom: 20,
    alignItems: 'center',
    flexGrow: 1,  // Allow this section to take up remaining space
    flexShrink: 0,  // Prevent it from shrinking too much
  },
  disabledButton: {
    backgroundColor: '#d3d3d3', // Gray background for disabled buttons
    opacity: 0.6, // Lower opacity to indicate it's disabled
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5, // Add some space between the label and input
    color: '#333', // A darker color for better readability
  },
  eventImage: {
    width: 200,  // Width of the image
    height: 200, // Height of the image
    marginBottom: 20, // Add some space below the image
    borderRadius: 10, // Optional: rounded corners
  },
});