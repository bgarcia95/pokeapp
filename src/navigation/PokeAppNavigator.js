import React from 'react';
import Login from '../screens/Auth/Login';
import Teams from '../screens/Teams';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile';
import TeamsManagement from '../screens/TeamsManagement';
import ViewTeam from '../screens/ViewTeam';

const TeamsStackNavigator = createStackNavigator();

export const TeamsNavigator = () => {
  return (
    <TeamsStackNavigator.Navigator headerMode="none">
      <TeamsStackNavigator.Screen name="TeamsScreen" component={Teams} />
      <TeamsStackNavigator.Screen
        name="TeamsManagementScreen"
        component={TeamsManagement}
      />
      <TeamsStackNavigator.Screen name="ViewTeam" component={ViewTeam} />
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
      <MainStackNavigator.Screen name="Profile" component={Profile} />
      <MainStackNavigator.Screen name="Teams" component={TeamsNavigator} />
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
