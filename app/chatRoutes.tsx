import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './Chat'
import ChatWithPerson from './chatwithperson';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Chat"
        screenOptions={{
          gestureEnabled: true, gestureDirection: 'horizontal',
          headerShown: false
        }}>
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ChatWithPerson" component={ChatWithPerson} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
