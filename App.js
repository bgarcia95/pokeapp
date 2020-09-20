import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import configStore from './src/redux/store/configureStore';
import {OrderNavigator} from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';

const store = configStore();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <OrderNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
