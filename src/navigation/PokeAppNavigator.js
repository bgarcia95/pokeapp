import React from 'react';
import Login from '../screens/Auth/Login';
import Teams from '../screens/Teams';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile';
import TeamsManagement from '../screens/TeamsManagement';
import ViewTeam from '../screens/ViewTeam';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'OpenSans-Regular',
  },
};

const TeamsStackNavigator = createStackNavigator();

export const AppMainNavigator = () => {
  return (
    <TeamsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <TeamsStackNavigator.Screen
        name="Home"
        component={MainNavigator}
        options={{headerShown: false}}
      />
      <TeamsStackNavigator.Screen name="ViewTeam" component={ViewTeam} />
      <TeamsStackNavigator.Screen
        name="TeamsManagementScreen"
        component={TeamsManagement}
      />
    </TeamsStackNavigator.Navigator>
  );
};

const MainStackNavigator = createMaterialBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator
      activeColor="#fff"
      shifting={true}
      backBehavior="history">
      <MainStackNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (tabInfo) => (
            <AntDesignIcon name="user" size={24} color={tabInfo.color} />
          ),
          tabBarColor: Colors.primary,
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{fontFamily: 'OpenSans-Regular'}}>Profile</Text>
            ) : (
              'Profile'
            ),
        }}
      />
      <MainStackNavigator.Screen
        name="TeamsScreen"
        component={Teams}
        options={{
          tabBarIcon: (tabInfo) => (
            <MaterialCommunityIcon
              name="pokemon-go"
              size={24}
              color={tabInfo.color}
            />
          ),
          tabBarColor: Colors.accent,
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{fontFamily: 'OpenSans-Regular'}}>Teams</Text>
            ) : (
              'Teams'
            ),
        }}
      />
    </MainStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator headerMode="none">
      <AuthStackNavigator.Screen name="Login" component={Login} />
    </AuthStackNavigator.Navigator>
  );
};
