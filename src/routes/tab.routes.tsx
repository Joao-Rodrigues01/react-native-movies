import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Fontisto, MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';

import Home from '../screens/Home';
import Playing from '../screens/Playing';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const icons: {[ index: string ]: any} = {
  Home: {
    lib: MaterialCommunityIcons,
    name: 'home',
    nameOutline: 'home-outline'
  },
  Playing: {
    lib: Ionicons,
    name: 'play-circle',
    nameOutline: 'play-circle-outline'
  },
  Favorites: {
    lib: MaterialCommunityIcons,
    name: 'bookmark-minus',
    nameOutline: 'bookmark-minus-outline'
  },
  Profile: {
    lib: Ionicons,
    name: 'person',
    nameOutline: 'person-outline'
  }
}

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        
        tabBarIcon: ({ color, focused }) => {
          const { lib: Icon, name, nameOutline } = icons[route.name];

          return focused ? <Icon name={name} size={32} color={color} /> : <Icon name={nameOutline} size={32} color={color} />; 
        }
      })}
      tabBarOptions={{
        style: {
          backgroundColor: '#be2239',
          height: 60,
          width: 350,
          borderTopWidth: 0,
          borderRadius: 42,
          bottom: 34,
          left: 23,
          position: 'absolute',
        },
        labelStyle: {
          fontSize: 0,
        },
        
        activeTintColor: '#fff',
        inactiveTintColor: '#FF899D'
      }}
    >
      <Tab.Screen 
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => {
           return focused ? 
           <Text style={{
             fontSize: 16,
             color: '#fff',
             fontWeight: 'bold',

             position: 'absolute',
             left: 64,
             bottom: 20
           }}
           >
            Home</Text> : <></>
          }
        }} 
      />

    <Tab.Screen 
        name="Playing"
        component={Playing}
        options={{
          tabBarLabel: ({ focused }) => {
           return focused ? 
           <Text style={{
             fontSize: 16,
             color: '#fff',
             fontWeight: 'bold',

             position: 'absolute',
             left: 64,
             bottom: 20
           }}
           >
            Playing</Text> : <></>
          }
        }} 
      />

    <Tab.Screen 
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: ({ focused }) => {
           return focused ? 
           <Text style={{
             fontSize: 16,
             color: '#fff',
             fontWeight: 'bold',

             position: 'absolute',
             left: 55,
             bottom: 20
           }}
           >
            Favorites</Text> : <></>
          }
        }} 
      />

    <Tab.Screen 
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => {
           return focused ? 
           <Text style={{
             fontSize: 16,
             color: '#fff',
             fontWeight: 'bold',

             position: 'absolute',
             right: 64,
             bottom: 20
           }}
           >
            Profile</Text> : <></>
          }
        }} 
      />
    </Tab.Navigator>
  )
}
