import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetails from '../screens/MovieDetails';
import { Entypo } from '@expo/vector-icons'; 
import TabRoutes from './tab.routes';
import { View } from 'react-native';
import TVShowDetails from '../screens/TVShowDetails';

const Stack = createStackNavigator();

export default function StackRoutes() {

  
  return (
    <View style={{ flex: 1, backgroundColor: '#171821' }}>
      <Stack.Navigator
        initialRouteName="Home"
        mode="modal"
      >
        <Stack.Screen 
          name="Home"
          component={TabRoutes}
          options={{
            headerShown: false,
            
          }}
          />

        <Stack.Screen 
          name="MovieDetails" 
          component={MovieDetails}
          options={{
            headerBackImage: () => <Entypo size={30} name="chevron-left" color="#fff"/>,
            headerTransparent: true,
            headerTitle: ''
          }}        
        />

        <Stack.Screen 
          name="TVShowDetails"
          component={TVShowDetails}
          options={{
            headerBackImage: () => <Entypo size={30} name="chevron-left" color="#fff"/>,
            headerTransparent: true,
            headerTitle: ''
          }}  
        />

      </Stack.Navigator>
  </View>
    
  )
}
