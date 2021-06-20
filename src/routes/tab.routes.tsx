import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons  } from '@expo/vector-icons';

import Home from '../screens/Home';
import Playing from '../screens/Playing';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import { Dimensions, Text } from 'react-native';
import StackRoutes from './stack.routes';

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
  const deviceSize = Dimensions.get('window');

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        
        tabBarIcon: ({ color, focused }) => {
          let { lib: Icon, name, nameOutline } = icons[route.name];

          focused ? name : name = nameOutline;

          return <Icon name={name} size={deviceSize.width * 0.08} color={color} />
        }
      })}
      tabBarOptions={{
        style: {
          backgroundColor: '#be2239',
          height: 60,
          width: deviceSize.width * 0.8,
          borderTopWidth: 0,
          borderRadius: 42,
          bottom: deviceSize.height * 0.045,
          left: deviceSize.width * 0.1,
          position: 'absolute',
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
