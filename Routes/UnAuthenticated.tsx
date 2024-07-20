import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../app/signUp';
import LogInScreen from '../app/login';

const Stack = createNativeStackNavigator();

const Authenticated = () => {
    return (
        <Stack.Navigator
            initialRouteName='LogIn'
            screenOptions={{
                gestureEnabled: true, gestureDirection: 'horizontal',
                headerShown: false
            }}>

            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}

export default Authenticated;