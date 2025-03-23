import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import Auth from '@/components/Auth';

const Profile: React.FC = () => {
  const { user, loading, isAuthenticated } = useSupabaseAuth();

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    clubs: false,
    topics: false,
  });

  const [clubs, setClubs] = useState<string[]>(['Oasis', 'Scout', 'Sports Club XYZ']);
  const [newClub, setNewClub] = useState('');
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
    if (newClub.trim()) {
      setClubs([...clubs, newClub]);
      setNewClub('');
    }
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
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
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

      {/* Clubs Dropdown */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('clubs')} style={styles.dropdownHeader}>
          <Text style={styles.sectionTitle}>Clubs</Text>
        </TouchableOpacity>
        {expanded.clubs && (
          <View style={styles.dropdownContent}>
            {clubs.map((club, index) => (
              <Text key={index} style={styles.listItem}>{club}</Text>
            ))}
            <TextInput
              style={styles.input}
              placeholder="Add a new club"
              value={newClub}
              onChangeText={setNewClub}
            />
            <Button title="Add Club" onPress={addClub} />
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
            <Text style={styles.subTitle}>Select Your Interests:</Text>
            
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
                <Text style={styles.subTitle}>Your Selected Topics:</Text>
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
    </ScrollView>
  ) : (
    <Auth />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
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
    borderColor: '#000',
  },
  profileInfo: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  major: {
    fontSize: 16,
    color: '#444',
    marginTop: 5,
  },
  editableText: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
  },
  section: {
    marginBottom: 15,
  },
  dropdownHeader: {
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#444',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  topicButton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 8,
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: '#cc0000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
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
    backgroundColor: '#f0f0f0',
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