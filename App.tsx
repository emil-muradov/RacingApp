import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './src/store/store.ts';
import { AppNavigator } from './src/navigation/AppNavigator.tsx';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';

const lightTheme = {
  ...DefaultTheme,
  dark: false,
};

const theme = lightTheme;

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </PersistGate>
  </Provider>
);

export default App;
