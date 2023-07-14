import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import InitialScreen from './src/InitialScreen';

const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
    },
  },
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <InitialScreen />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
