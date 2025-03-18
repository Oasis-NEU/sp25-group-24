import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs  // style for the tab headers
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#000000',
        headerStyle: {
          backgroundColor: '#CC0000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#CC0000',
          borderTopWidth: 0,
          height: 80,
          paddindBottom: 10,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
        }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
        />
        <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="comments" color={color} />,
        }}
        />
    </Tabs>
  );
}
