import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

const Authenticated = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                gestureEnabled: true, gestureDirection: 'horizontal',
                headerShown: false
            }}>

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
        </Stack.Navigator>
    )
}

export default Authenticated;