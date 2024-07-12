import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './login';
import HomeScreen from './mainPage';
import SignUp from './signUp';
import Chat from './chatRoutes';
import Settings from './settingsRoutes';
import HealthScreen from './health';
import TaggyScreen from './taggyChat';
import ProfileScreen from './profile';
import ProfilePersonScreen from './profilePerson';
import DiaryScreen from './diary';
import MatesScreen from './mates'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="login"
      screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal', 
      headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Health" component={HealthScreen} />
        <Stack.Screen name="Taggy" component={TaggyScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="profilePerson" component={ProfilePersonScreen} />
        <Stack.Screen name="Diary" component={DiaryScreen} />
        <Stack.Screen name="Mates" component={MatesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
