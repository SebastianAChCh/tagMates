import * as React from 'react';
import { LeagueSpartan_800ExtraBold } from '@expo-google-fonts/league-spartan';
import { useFonts } from 'expo-font';
import { reloadAsync } from 'expo-updates';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import { signUpForm } from '../types/Session';
import { useAuth } from '../providers/Authentication';

export default function SignUp({ navigation }: { navigation: any }) {
  const [session, setSession] = React.useState<signUpForm>({
    name: '',
    lastname: '',
  });
  const [password, setPassword] = React.useState<string>('');
  const { signUp, setLoginSuccess } = useAuth();
  const [fontsLoaded] = useFonts({
    LeagueSpartan_800ExtraBold,
  });

  const handleSingUp = async () => {
    try {
      if (signUp) {
        if (password !== session.password) return ''; // send an alert to the user that the password is not the same
        const fullname =
          session?.name && session?.lastname
            ? session?.name + ' ' + session?.lastname
            : '';
        const response = await signUp({
          age: session?.age,
          email: session?.email,
          emergency_contact: session?.emergency_contact,
          fullname,
          password: session?.password,
        });
        if (response && Platform.OS === 'web' && setLoginSuccess) {
          setLoginSuccess(true);
        } else if (response) {
          await reloadAsync();
        }
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Text
            style={[
              styles.logoText,
              { fontFamily: 'LeagueSpartan_800ExtraBold' },
            ]}
          >
            TagMates
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text
          style={[
            styles.welcomeText,
            { fontFamily: 'LeagueSpartan_800ExtraBold' },
          ]}
        >
          Sign Up
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Name(s)"
          onChangeText={(e) => {
            setSession((oldData) => ({
              ...oldData,
              ['name']: e,
            }));
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name(s)"
          onChangeText={(e) => {
            setSession((oldData) => ({
              ...oldData,
              ['lastname']: e,
            }));
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(e) => {
            setSession((oldData) => ({
              ...oldData,
              ['email']: e,
            }));
          }}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(e) => {
            setSession((oldData) => ({
              ...oldData,
              ['password']: e,
            }));
          }}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(e) => {
            setPassword(e);
          }}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(e) => {
            setSession((oldData) => ({
              ...oldData,
              ['emergency_contact']: e,
            }));
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSingUp();
          }}
        >
          <Text
            style={[
              styles.buttonText,
              { fontFamily: 'LeagueSpartan_800ExtraBold' },
            ]}
          >
            Create Account
          </Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text
            style={[
              styles.forgotPasswordText,
              { fontFamily: 'LeagueSpartan_800ExtraBold' },
            ]}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text
              style={[
                styles.registerText,
                { fontFamily: 'LeagueSpartan_800ExtraBold' },
              ]}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    marginBottom: 30,
  },
  logoContainer: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 7,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 5,
  },
  logoText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#00A19D',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  button: {
    width: '100%',
    height: 42,
    backgroundColor: '#00A19D',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#000',
    textAlign: 'center',
  },
  registerText: {
    color: '#00A19D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
  },
});
