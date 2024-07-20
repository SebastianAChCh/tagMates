import { NavigationContainer } from '@react-navigation/native';
import AuthenticationProvider, { useAuth } from '../providers/Authentication';
import Authenticated from '../Routes/Authenticated';
import UnAuthenticated from '../Routes/UnAuthenticated';

const Main = () => {
  const { publicToken } = useAuth();
  return (
    <NavigationContainer independent={true}>
      {publicToken ? <Authenticated /> : <UnAuthenticated />}
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
