import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types.ts';
import { DriversScreen } from '../modules/drivers/screens/DriversScreen.tsx';
import { DriverDetailsScreen } from '../modules/drivers/screens/DriverDetailsScreen.tsx';
import { RacesScreen } from '../modules/drivers/screens/RacesScreen.tsx';

const RootStack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <RootStack.Navigator initialRouteName="Drivers">
    <RootStack.Screen name="Drivers" component={DriversScreen} />
    <RootStack.Screen name="DriverDetails" component={DriverDetailsScreen} />
    <RootStack.Screen name="Races" component={RacesScreen} />
  </RootStack.Navigator>
);
