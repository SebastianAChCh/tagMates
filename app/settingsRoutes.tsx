import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './settingsMain';
import Chat from '../app/chatRoutes';
import HealthScreen from '../app/health';
import TaggyScreen from '../app/taggyChat';
import ProfileScreen from '../app/profile';
import MatesScreen from '../app/mates';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      >
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Chat" component={Chat} />

        <Stack.Screen name="Health" component={HealthScreen} />
        <Stack.Screen name="Taggie" component={TaggyScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Mates" component={MatesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
