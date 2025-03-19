import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const Profile: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    techClub: false,
    artClub: false,
    sportsClub: false,
  });

  // Toggle function for drop-down sections
  const toggleSection = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual image URL
          style={styles.profileImage}
        />
        <Text style={styles.name}>Ananya Pochinapeddi</Text>
        <Text style={styles.email}>ananya@email.com</Text>
      </View>

      {/* Drop-down Sections for Clubs */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('techClub')} style={styles.dropdownHeader}>
          <Text style={styles.sectionTitle}>Tech Club</Text>
        </TouchableOpacity>
        {expanded.techClub && (
          <Text style={styles.dropdownContent}>Location: Innovation Lab, Building 3</Text>
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('artClub')} style={styles.dropdownHeader}>
          <Text style={styles.sectionTitle}>Art Club</Text>
        </TouchableOpacity>
        {expanded.artClub && (
          <Text style={styles.dropdownContent}>Location: Creative Arts Center, Room 204</Text>
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('sportsClub')} style={styles.dropdownHeader}>
          <Text style={styles.sectionTitle}>Sports Club</Text>
        </TouchableOpacity>
        {expanded.sportsClub && (
          <Text style={styles.dropdownContent}>Location: Athletic Complex, Field 2</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ff6b6b',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  section: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
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
  dropdownContent: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#ffdada',
    borderRadius: 5,
    marginTop: 5,
  },
});

export default Profile;
