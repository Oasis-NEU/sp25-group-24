import { useEffect } from 'react';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, Alert, TouchableOpacity, ScrollView } from 'react-native';
import * as Calendar from 'expo-calendar';
import { supabase } from '@/supabase';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import Auth from '@/components/Auth';

export default function Tab() {

  const { user, loading, isAuthenticated } = useSupabaseAuth();

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
      events: false,
    });
  
  const toggleSection = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  //<Button title="Add Events To Calendar!" onPress={() => addUserEventsToCalendar(user.id)} />
const [events] = useState<string[]>(['Tech Conference', 'Art Showcase', 'Marathon']);




  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);



  return isAuthenticated ? (
    <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.container}>
      <Text>Go to your calander app to see when your events are!</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>

      {/* Events Dropdown */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('events')} style={styles.dropdownHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
        </TouchableOpacity>
        {expanded.events && (
          <View style={styles.dropdownContent}>
            {events.map((event, index) => (
              <Text key={index} style={styles.listItem}>{event}</Text>
            ))}
          </View>
        )}
      </View>

          </ScrollView>

  ) : (
        <Auth />
      );
};



async function getUserEvents(id: number) {
    const{data, error} = await supabase
    .from("SignedUp")
    .select("*")
    .eq("user_id", id)
  
    if(error) {
      return []
    }
  
    return(data)
   }


   async function getDefaultCalendarSource() {
    if (Platform.OS === 'ios') {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      return defaultCalendar?.source;
    }
  
    // Fallback for Android: Ensure it includes 'type'
    return {
      isLocalAccount: true,
      name: 'NEU Event Calendar',
      type: 'LOCAL', // Required to match the `Source` type
    };
  }

async function createCalendar() {
  const defaultCalendarSource = await getDefaultCalendarSource() 
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'NEU Event Calender',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: Platform.OS === 'ios' && defaultCalendarSource ? defaultCalendarSource.id : undefined,
    source: defaultCalendarSource,
    name: 'NEU Event Calendar',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
  Alert.alert('Calander Created')
}

async function addUserEventsToCalendar(user_id: number) {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const calendarId = calendars[0]?.id; // Use the first available calendar

  if (!calendarId) {
    Alert.alert('No Calendar Found', 'Please ensure a calendar is available.');
    return;
  }


  const userEvent = await getUserEvents(user_id);
  for(let i = 0; i < userEvent.length; i++) {
  await Calendar.createEventAsync(calendarId, {
    title: userEvent[i].name,
    startDate: new Date(), //make the date and time in supabase not text?
    endDate: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
    timeZone: 'EST',
    notes: userEvent[i].description,
  }) }; 

  Alert.alert('Success', 'Event added to the calendar!');
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dropdownHeader: {
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 8,
  },
  dropdownContent: {
    padding: 10,
    backgroundColor: '#ffdada',
    borderRadius: 5,
    marginTop: 5,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginBottom: 15,
  },
});




