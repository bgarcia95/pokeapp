import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {AuthNavigator, AppMainNavigator} from './PokeAppNavigator';

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.userData);

  return (
    <NavigationContainer>
      {isAuth && <AppMainNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
