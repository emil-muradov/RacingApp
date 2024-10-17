import { createStackNavigator } from '@react-navigation/stack';
import {Drivers} from '../modules/drivers/components/Drivers.tsx';
import {DriverDetails} from '../modules/drivers/components/DriverDetails.tsx';
import {DriverRaces} from '../modules/drivers/components/DriverRaces.tsx';

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Drivers" component={Drivers} />
    <Stack.Screen name="DriverDetails" component={DriverDetails} />
    <Stack.Screen name="DriverRaces" component={DriverRaces} />
  </Stack.Navigator>
);
