// import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {authenticate, logout} from '../../redux/actions/auth';

const Login = (props) => {
  const dispatch = useDispatch();

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
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
    if (user) {
      console.log('true');
      dispatch(authenticate(user));
    } else {
      console.log('false');
      dispatch(logout());
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '140571925073-nnfpp72amof458ljsk82l5hsaohq3mlo.apps.googleusercontent.com',
      offlineAccess: true,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
    <View style={styles.screen}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={_signIn}
      />
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
});

export default Login;
