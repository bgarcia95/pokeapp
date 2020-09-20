// import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Login = (props) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHome, setShowHome] = useState(false);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();

      setLoading(true);
      setloggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);

      setLoading(false);
      props.navigation.replace('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const onAuthStateChanged = (user) => {
    console.log('User!!', user);
    setUser(user);
    console.log(user);
    if (user) {
      setloggedIn(true);
    } else {
      setloggedIn(false);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '140571925073-nnfpp72amof458ljsk82l5hsaohq3mlo.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // const newReference = database().ref('/usuarios');
  // const handleSubmit = () => {
  //   newReference
  //     .push({
  //       name: 'Gabriela Preza',
  //       edad: 15,
  //     })
  //     .then(() => console.log('Data updated.'));
  // };

  const signOut = async () => {
    try {
      setLoading(true);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => setLoading(false));
      setloggedIn(false);
      setUser([]);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator color="#353535" size="large" />
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      {!loggedIn && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>PokeApp</Text>
          <View
            style={{
              height: 30,
              width: 30,
              marginLeft: 5,
              marginBottom: 10,
            }}>
            <Image
              source={{
                uri:
                  'https://res.cloudinary.com/bgarcia95/image/upload/v1600496542/pokeapp/pokeball_bdt5vr.png',
              }}
              style={{height: '100%', width: '100%', marginBottom: 20}}
            />
          </View>
        </View>
      )}
      <View>
        {!loggedIn && (
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={_signIn}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        {/* {!user && <Text>You are currently logged out</Text>} */}
        {user && (
          <View>
            <Text>Welcome {user.displayName}</Text>
            <View
              style={{
                height: 150,
                width: 150,
                borderRadius: 75,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: user.photoURL}}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <Button
              onPress={() => setShowHome(true)}
              title="Go Home"
              color="purple"
            />
            <Button onPress={signOut} title="LogOut" color="red" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'PressStart2P-Regular',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Login;
