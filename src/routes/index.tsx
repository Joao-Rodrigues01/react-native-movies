import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import TabRoutes from './tab.routes';

const Routes = () => {
  return (
    <NavigationContainer>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#171821"
      />
      <TabRoutes />
    </NavigationContainer>
  )
}
export default Routes;