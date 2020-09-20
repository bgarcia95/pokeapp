import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import configStore from './src/redux/store/configureStore';
import AppNavigator from './src/navigation/AppNavigator';

const store = configStore();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </Provider>
  );
};

export default App;
