import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, Fontisto, MaterialIcons  } from '@expo/vector-icons';

import Home from '../screens/Home';
import Playing from '../screens/Playing';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();


const icons: {[ index: string ]: any} = {
  Home: {
    lib: MaterialIcons,
    name: 'home-filled',
  },
  Playing: {
    lib: Ionicons,
    name: 'play-circle',
  },
  Favorites: {
    lib: Fontisto,
    name: 'favorite'
  },
  Profile: {
    lib: Ionicons,
    name: 'person'
  }
}

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const { lib: Icon, name } = icons[route.name];

          return <Icon name={name} size={32} color={color} />; 
        }
      })}
      tabBarOptions={{
        style: {
          backgroundColor: '#be2239',
          height: 66,
          width: 350,
          borderTopWidth: 0,

          // paddingVertical: 14,
          borderRadius: 42,
          bottom: 34,
          left: 20,
          position: 'absolute',
        },
        labelStyle: {
          fontSize: 14,
          paddingVertical: 10,
          fontWeight: 'bold'
        },
        showLabel: false,
        
        activeTintColor: '#fff',
        inactiveTintColor: '#FF899D'
      }}
    >
      <Tab.Screen 
        name="Home"
        component={Home}
      />

    <Tab.Screen 
        name="Playing"
        component={Playing}
      />

    <Tab.Screen 
        name="Favorites"
        component={Favorites}
      />

    <Tab.Screen 
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  )
}
