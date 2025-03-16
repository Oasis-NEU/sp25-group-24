import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs  // style for the tab headers
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerStyle: {
          backgroundColor: "#BB9DBB",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: 'bold',
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="anchor" color={color} />,
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
