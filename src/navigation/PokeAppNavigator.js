import React from 'react';
import Login from '../screens/Auth/Login';
import Home from '../screens/Home';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile';

const MainStackNavigator = createMaterialBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator
      activeColor="#fff"
      shifting={true}
      backBehavior="history">
      <MainStackNavigator.Screen name="Profile" component={Profile} />
      <MainStackNavigator.Screen name="Home" component={Home} />
    </MainStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name="Login" component={Login} />
    </AuthStackNavigator.Navigator>
  );
};
