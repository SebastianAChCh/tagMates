import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../app/signUp';
import LogInScreen from '../app/login';
import HomeScreen from '../app/mainPage';
import Chat from '../app/chatRoutes';
import Settings from '../app/settingsRoutes';
import HealthScreen from '../app/health';
import TaggyScreen from '../app/taggyChat';
import ProfileScreen from '../app/profile';
import ProfilePersonScreen from '../app/profilePerson';
import DiaryScreen from '../app/diary';
import MatesScreen from '../app/mates';
import ChatWithPerson from '../app/chatwithperson'
import Zaps from '../app/zapMain'

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
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="ChatWithPerson" component={ChatWithPerson} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Health" component={HealthScreen} />
            <Stack.Screen name="Taggie" component={TaggyScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="profilePerson" component={ProfilePersonScreen} />
            <Stack.Screen name="Diary" component={DiaryScreen} />
            <Stack.Screen name="Mates" component={MatesScreen} />
            <Stack.Screen name="Zaps" component={Zaps} />
        </Stack.Navigator>
    )
}

export default Authenticated;