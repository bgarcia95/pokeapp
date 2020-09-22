import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {authenticate, logout} from '../redux/actions/auth';
import {Button} from 'react-native-paper';

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
      scopes: ['email'],
      webClientId:
        '140571925073-nnfpp72amof458ljsk82l5hsaohq3mlo.apps.googleusercontent.com',
      offlineAccess: true,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
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
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require('../../assets/img/poke-bg.png')}
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.screen}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome <Text style={styles.userName}>{user.displayName} !</Text>
          </Text>
        </View>
        <View style={styles.userPictureWrapper}>
          <Image
            source={{uri: user.photoURL}}
            style={{height: '100%', width: '100%'}}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={signOut}
            color="#ED1B24"
            mode="contained"
            contentStyle={{width: '100%', height: '100%'}}>
            Logout
          </Button>
        </View>
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

  backgroundImageContainer: {
    position: 'absolute',
    top: -80,
    alignSelf: 'flex-end',
    left: 255,
  },
  backgroundImage: {
    width: 250,
    height: 250,
  },
  welcomeContainer: {
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'OpenSans-Regular',
  },
  userName: {
    fontSize: 24,
    color: 'gray',
  },
  userPictureWrapper: {
    height: 150,
    width: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginVertical: 10,
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 5,
  },
  buttonContainer: {width: '100%', height: 50},
});
export default Profile;
