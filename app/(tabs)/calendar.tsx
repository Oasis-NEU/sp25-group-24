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

  type Event = {
    name: string;
    club: string;
    date: string;
  };

  const [events, setEvents] = useState<Event[]>([
    { name: "Demo Day", club: "Oasis", date: "3/23/2025"},
    { name: "Cheese", club: "Cheese Club", date: "03/27/2025"},
    { name: "Open Mic Night", club: "N/A", date: "03/27/2025"},
    { name: "Mont Tremblant", club: "Downhillers", date: "03/28/2025"},
    { name: "Game Night Madness", club: "Board Game Club", date: "04/05/2025"},
    { name: "Tech Conference", club: "Tech", date: "04/12/2025"},
  ]);


  //<Button title="Add Events To Calendar!" onPress={() => addUserEventsToCalendar(user.id)} />





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

return isAuthenticated ? (
  <ScrollView contentContainerStyle={styles.container}>

    {/* Events Dropdown */}
    <View style={styles.section}>
      <TouchableOpacity onPress={() => toggleSection('events')} style={styles.dropdownHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
      </TouchableOpacity>
      {expanded.events && (
        <View style={styles.dropdownContent}>
          <View style={styles.eventTable}>
            <View style={styles.eventRowHeader}>
              <Text style={styles.eventColumn}>Event Name</Text>
              <Text style={styles.eventColumn}>Club</Text>
              <Text style={styles.eventColumn}>Date</Text>
            </View>
            {Array.isArray(events) ? events.map((event: Event, index) => (
              <View key={index} style={styles.eventRow}>
                <Text style={styles.eventColumn}>{event.name || "N/A"}</Text>
                <Text style={styles.eventColumn}>{event.club || "N/A"}</Text>
                <Text style={styles.eventColumn}>{event.date || "N/A"}</Text>
              </View>
            )) : null}
          </View>
        </View>
      )}
    </View>

    <View style={styles.container}>
    <Button title="Create a new calendar" onPress={createCalendar} color={'white'}/>
  </View>

        </ScrollView>

) : (
      <Auth />
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(247, 121, 121)',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  text: {
    marginBottom: 5,
    textAlign: 'center',
    color: '#cc0000'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  dropdownHeader: {
    backgroundColor: '#cc0000',
    padding: 10,
    borderRadius: 8,
    width: 350,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  dropdownContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 400, // Adjust the height as needed
    color: '#cc0000',
    borderWidth: 3,
    borderColor: '#000',
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
  eventTable: {
    width: '100%',
  },
  eventRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  eventColumn: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16, // Increase font size for better readability
    color: '#cc0000'
  },
});




