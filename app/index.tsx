import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configFirebase';
import { LogInType } from '../types/LogIn';

export default function Root() {
  const [fontsLoaded] = useFonts({
    Custom: require('../assets/fonts/League.ttf'),
  });

  const [data, setData] = useState<LogInType>({ email: '', password: '' });

  const handleLogin = async () => {
    try {
      const userAuth = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userAuth) {
        alert('Inicio de sesion correcto');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.bg}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        <View style={styles.titlebox}>
          <Text style={styles.title}>TagMates</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome!</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.box}>
            <TextInput
              style={styles.text}
              placeholder="Email"
              onChangeText={(e) => {
                setData((oldData) => ({
                  ...oldData,
                  ['email']: e,
                }));
              }}
            />
          </View>

          <View style={styles.box}>
            <TextInput
              style={styles.text}
              placeholder="Password"
              onChangeText={(e) => {
                setData((oldData) => ({
                  ...oldData,
                  ['password']: e,
                }));
              }}
            />
          </View>

          <View>
            <Pressable
              style={styles.loginbox}
              onPress={() => {
                handleLogin();
              }}
            >
              <Text style={styles.textlog}>Log In</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.container2}>
          <View>
            <Text style={styles.text}>Forgot Password?</Text>
          </View>

          <View>
            <Text style={styles.textreg}>Register</Text>
          </View>
        </View>

        <Image
          source={require('../assets/images/ManosPrietas.png')}
          style={styles.image}
          resizeMode="stretch"
        ></Image>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#FAF6F6',
    flex: 1,
    fontFamily: 'Custom',
  },

  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Custom',
    color: '#00ABA1',
    fontSize: 30,
  },

  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FAF6F6',
  },

  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF6F6',
    padding: 10,
  },
  box: {
    width: 330,
    height: 60,
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    color: 'black',
    textAlign: 'left',
    margin: 10,
  },

  textlog: {
    color: 'white',
    textAlign: 'left',
    fontFamily: 'Custom',
    fontSize: 22,
  },

  textreg: {
    color: '#00ABA1',
    textAlign: 'left',
    fontSize: 18,
    textDecorationLine: 'underline',
    marginEnd: 20,
    fontFamily: 'Custom',
  },

  welcome: {
    fontFamily: 'Custom',
    color: 'black',
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  titlebox: {
    backgroundColor: 'white',
    width: 180,
    marginTop: 70,
    marginEnd: 60,
    padding: 20,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  loginbox: {
    width: 300,
    height: 60,
    backgroundColor: '#00A79D',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  image: {
    width: 390,
    height: 320,
  },

  contImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
