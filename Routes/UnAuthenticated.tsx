import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from '../app/login';
import SignUp from '../app/signUp';

const Stack = createNativeStackNavigator();

const Authenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}
    >
      <Stack.Screen name="logIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default Authenticated;
