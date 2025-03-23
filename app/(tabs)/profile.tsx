import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import Auth from '@/components/Auth';
import { supabase } from '@/supabase';

const Profile: React.FC = () => {
  const { user, loading, isAuthenticated } = useSupabaseAuth();

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    clubs: false,
    topics: false,
  });

  // Enhanced club structure with dates and times
  interface Club {
    name: string;
    schedule: string;
    id: string;
  }

  const [clubs, setClubs] = useState<Club[]>([
    { id: '1', name: 'Oasis', schedule: 'Mondays 5-7pm' },
    { id: '2', name: 'Scout', schedule: 'Tuesdays 3-5pm' },
    { id: '3', name: 'Sports Club XYZ', schedule: 'Fridays 2-4pm' }
  ]);
  
  const [newClub, setNewClub] = useState({ name: '', schedule: '' });
  const [editingClubId, setEditingClubId] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  
  // Pre-defined list of interests that the user can choose from
  const availableTopics = [
    'Sports', 'Music', 'Art', 'Technology', 'Travel', 'Reading', 'Movies', 'Photography', 'Cultural', 'Design',
    'Intramural Sports', 'Engineering', 'Medical', 'Biology', 'Dance'
  ];

  const [isEditing, setIsEditing] = useState<{ name: boolean; email: boolean; major: boolean }>({
    name: false,
    email: false,
    major: false,
  });

  const [profile, setProfile] = useState<{ name: string; email: string; major: string }>({
    name: 'Name!',
    email: 'name.rest@email.com',
    major: 'Computer Science',
  });

  const toggleSection = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const addClub = () => {
    if (newClub.name.trim() && newClub.schedule.trim()) {
      const newClubWithId = {
        ...newClub,
        id: Date.now().toString() // Simple unique ID
      };
      setClubs([...clubs, newClubWithId]);
      setNewClub({ name: '', schedule: '' });
    }
  };

  const startEditClub = (club: Club) => {
    setEditingClubId(club.id);
    setNewClub({ name: club.name, schedule: club.schedule });
  };

  const updateClub = () => {
    if (editingClubId && newClub.name.trim() && newClub.schedule.trim()) {
      setClubs(clubs.map(club => 
        club.id === editingClubId 
          ? { ...club, name: newClub.name, schedule: newClub.schedule }
          : club
      ));
      setNewClub({ name: '', schedule: '' });
      setEditingClubId(null);
    }
  };

  const cancelEdit = () => {
    setEditingClubId(null);
    setNewClub({ name: '', schedule: '' });
  };

  const deleteClub = (id: string) => {
    setClubs(clubs.filter(club => club.id !== id));
  };

  // Function to handle adding a selected topic to the list
  const addTopic = (topic: string) => {
    if (!topics.includes(topic)) {
      setTopics((prevTopics) => [...prevTopics, topic]);
    }
  };

  // Function to remove a topic from the list
  const removeTopic = (topicToRemove: string) => {
    setTopics(topics.filter(topic => topic !== topicToRemove));
  };

  return isAuthenticated ? (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg' }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          {/* Editable Name */}
          {isEditing.name ? (
            <TextInput
              style={styles.editableText}
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              onBlur={() => setIsEditing({ ...isEditing, name: false })}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing({ ...isEditing, name: true })}>
              <Text style={styles.name}>{profile.name}</Text>
            </TouchableOpacity>
          )}

          {/* Editable Email */}
          {isEditing.email ? (
            <TextInput
              style={styles.editableText}
              value={profile.email}
              onChangeText={(text) => setProfile({ ...profile, email: text })}
              onBlur={() => setIsEditing({ ...isEditing, email: false })}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing({ ...isEditing, email: true })}>
              <Text style={styles.email}>{profile.email}</Text>
            </TouchableOpacity>
          )}

          {/* Editable Major */}
          {isEditing.major ? (
            <TextInput
              style={styles.editableText}
              value={profile.major}
              onChangeText={(text) => setProfile({ ...profile, major: text })}
              onBlur={() => setIsEditing({ ...isEditing, major: false })}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing({ ...isEditing, major: true })}>
              <Text style={styles.major}>{profile.major}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Enhanced Clubs Dropdown with Split Header */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('clubs')} style={styles.dropdownHeader}>
          <View style={styles.splitHeader}>
            <View style={styles.headerSection}>
              <Text style={styles.sectionTitle}>Club</Text>
            </View>
            <View style={styles.headerDivider} />
            <View style={styles.headerSection}>
              <Text style={styles.sectionTitle}>Schedule</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        {expanded.clubs && (
          <View style={styles.dropdownContent}>
            {/* Display list of clubs with edit & delete options */}
            {clubs.map((club) => (
              <View key={club.id} style={styles.clubItem}>
                <View style={styles.clubInfo}>
                  <View style={styles.clubNameContainer}>
                    <Text style={styles.clubName}>{club.name}</Text>
                  </View>
                  <View style={styles.clubScheduleContainer}>
                    <Text style={styles.clubSchedule}>{club.schedule}</Text>
                  </View>
                </View>
                <View style={styles.clubActions}>
                  <TouchableOpacity onPress={() => startEditClub(club)} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteClub(club.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            
            {/* Form to add/edit clubs */}
            <View style={styles.clubFormContainer}>
              <Text style={styles.clubSubTitle}>
                {editingClubId ? 'Edit Club' : 'Add a New Club'}
              </Text>
              
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.input, styles.clubNameInput]}
                  placeholder="Club name"
                  value={newClub.name}
                  onChangeText={(text) => setNewClub({...newClub, name: text})}
                />
                <TextInput
                  style={[styles.input, styles.clubScheduleInput]}
                  placeholder="Meeting schedule"
                  value={newClub.schedule}
                  onChangeText={(text) => setNewClub({...newClub, schedule: text})}
                />
              </View>
              
              <View style={styles.buttonRow}>
                {editingClubId ? (
                  <>
                    <TouchableOpacity onPress={updateClub} style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>Update Club</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelEdit} style={[styles.actionButton, styles.cancelButton]}>
                      <Text style={styles.actionButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity onPress={addClub} style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Add Club</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Topics Dropdown with Button Selection */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('topics')} style={styles.dropdownHeader}>
          <Text style={styles.sectionTitle}>Interests</Text>
        </TouchableOpacity>
        {expanded.topics && (
          <View style={styles.dropdownContent}>
            <Text style={styles.interestSubTitle}>Select Your Interests:</Text>
            
            {/* Buttons for available topics */}
            <View style={styles.buttonContainer}>
              {availableTopics.map((topic) => (
                <TouchableOpacity
                  key={topic}
                  style={[
                    styles.topicButton,
                    topics.includes(topic) ? styles.selectedButton : {}
                  ]}
                  onPress={() => topics.includes(topic) ? removeTopic(topic) : addTopic(topic)}
                >
                  <Text 
                    style={[
                      styles.buttonText,
                      topics.includes(topic) ? styles.selectedButtonText : {}
                    ]}
                  >
                    {topic}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Display list of selected topics */}
            {topics.length > 0 && (
              <View style={styles.selectedTopicsContainer}>
                <Text style={styles.interestSubTitle}>Your Selected Topics:</Text>
                {topics.map((topic, index) => (
                  <View key={index} style={styles.selectedTopicItem}>
                    <Text style={styles.listItem}>{topic}</Text>
                    <TouchableOpacity onPress={() => removeTopic(topic)}>
                      <Text style={styles.removeButton}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
        <TouchableOpacity
         style={ styles.signout }
                      onPress={signOut}
                    ><Text style = {{color: "white", fontSize: 17, fontWeight: 'bold'}}>Sign Out</Text></TouchableOpacity>
    </ScrollView>
    
  ) : (
    
    <Auth />
  );
  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }
};


const styles = StyleSheet.create({
  
  container: {
    flexGrow: 1,
    backgroundColor:'rgb(247, 121, 121)',
    padding: 20,
  },
  signout: {
    height: 50,
    width: 100, 
    backgroundColor: 'black', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 50,
    position: 'absolute',
    bottom: 25, // Distance from the bottom
    left: '5%',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#cc0000',
  },
  profileInfo: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000'
  },
  email: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  major: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  editableText: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#fba1a1',
    paddingVertical: 2,
  },
  section: {
    marginBottom: 15,
  },
  dropdownHeader: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#000',
    alignItems: 'center',
  },
  splitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSection: {
    flex: 1,
    alignItems: 'center',
  },
  headerDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#cc0000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cc0000',
  },
  // Separate subtitle styles for clubs and interests
  clubSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#cc0000',
  },
  interestSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff', // Yellow color for interest subtitles
  },
  dropdownContent: {
    padding: 10,
    backgroundColor: '#cc0000',
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  clubItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 8,
    padding: 10,
  },
  clubInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  clubNameContainer: {
    flex: 1,
    paddingRight: 5,
  },
  clubScheduleContainer: {
    flex: 1,
    paddingLeft: 5,
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cc0000',
  },
  clubSchedule: {
    fontSize: 16,
    color: '#000',
  },
  clubActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#cc0000',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#000',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  clubFormContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  clubNameInput: {
    flex: 1,
    marginRight: 5,
  },
  clubScheduleInput: {
    flex: 1,
    marginLeft: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#cc0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cc0000',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  topicButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 3,
    marginRight: 5,
  },
  selectedButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#cc0000',
    fontSize: 15,
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  selectedTopicsContainer: {
    marginTop: 10,
  },
  selectedTopicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  removeButton: {
    color: '#cc0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;