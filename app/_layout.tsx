import { NavigationContainer } from '@react-navigation/native';
import AuthenticationProvider, { useAuth } from '../providers/Authentication';
import Authenticated from '../Routes/Authenticated';
import UnAuthenticated from '../Routes/UnAuthenticated';

const Main = () => {
  const { publicToken, loginSuccess } = useAuth();

  return (
    <NavigationContainer independent={true}>
      {publicToken || loginSuccess ? <Authenticated /> : <UnAuthenticated />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthenticationProvider>
      <Main />
    </AuthenticationProvider>
  );
}
