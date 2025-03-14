// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import MainScreen from './src/containers/MainScreen';

const App = () => (
  <Provider store={store}>
    <MainScreen />
  </Provider>
);

export default App;
