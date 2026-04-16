import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackedNavigator } from '@react-navigation/stack'; // Stack के लिए
import { Ionicons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';

// स्क्रीन इंपोर्ट्स
import HomeScreen from './HomeScreen'; 
import SearchScreen from './SearchScreen'; 
import ReelsScreen from './Reels';       
import ShopScreen from './shop-system';   
import ProfileScreen from './ProfileScreen'; 

const Tab = createBottomTabNavigator();

// टैब बार के लिए बेहतर स्टाइलिंग वाला फंक्शन
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Reels') iconName = focused ? 'play-circle' : 'play-circle-outline';
          else if (route.name === 'Shop') iconName = focused ? 'bag' : 'bag-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          // रील्स के लिए थोड़ा अलग लुक (ऑप्शनल)
          if (route.name === 'Reels') {
             return <Ionicons name={iconName} size={32} color={color} />;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000', // इंस्टाग्राम जैसा ब्लैक या यूट्यूब जैसा रेड
        tabBarInactiveTintColor: '#8e8e8e',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 60,
          paddingBottom: 10,
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#dbdbdb',
        },
        tabBarShowLabel: false, // प्रीमियम लुक के लिए नाम छिपा दें, सिर्फ आइकन रखें
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Reels" component={ReelsScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // यहाँ आप चेक कर सकते हैं कि यूज़र लॉगिन है या नहीं
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  return (
    <NavigationContainer>
      {/* यहाँ आप 'Stack Navigator' जोड़ सकते हैं ताकि सेटिंग्स या चैट पेज अलग से खुलें */}
      <MyTabs />
    </NavigationContainer>
  );
               }
            
