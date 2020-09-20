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
import {useDispatch, useSelector} from 'react-redux';
import {authenticate, logout} from '../redux/actions/auth';

const Profile = (props) => {
  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch(authenticate(user));
    } else {
      dispatch(logout());
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

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth().signOut();

      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  const user = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <View style={{marginVertical: 10}}>
          <Text>Welcome {user.displayName}</Text>
        </View>
        <View
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
            overflow: 'hidden',
            marginVertical: 10,
          }}>
          <Image
            source={{uri: user.photoURL}}
            style={{height: '100%', width: '100%'}}
          />
        </View>

        <Button onPress={signOut} title="LogOut" color="red" />
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
});
export default Profile;
