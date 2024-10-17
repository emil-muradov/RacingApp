import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store';
import { AppNavigator } from './src/navigation/AppNavigator.tsx';

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </Provider>
);

export default App;
