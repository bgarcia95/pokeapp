import React from 'react';
import Login from '../screens/Auth/Login';
import Home from '../screens/Home';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const OrderStackNavigator = createMaterialBottomTabNavigator();

export const OrderNavigator = () => {
  return (
    <OrderStackNavigator.Navigator
      activeColor="#fff"
      shifting={true}
      backBehavior="history">
      <OrderStackNavigator.Screen name="Profile" component={Login} />
      <OrderStackNavigator.Screen name="Home" component={Home} />
    </OrderStackNavigator.Navigator>
  );
};
