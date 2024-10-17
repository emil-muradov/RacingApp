import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from 'react-native-screens/native-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons.js';
import { DataTable, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../hooks/useAppSelector.ts';
import { RootStackParamList } from '../../../navigation/types.ts';

const blankProfileImage = require('../assets/blank_profile_pic.jpg');

export const DriverDetailsScreen = ({ route }: NativeStackScreenProps<RootStackParamList, 'DriverDetails'>) => {
  const { driverId } = route.params;
  const drivers = useAppSelector((state) => state.drivers.drivers);
  const driver = drivers.find((d) => d.driverId === driverId);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'DriverDetails'>>();

  if (!driver) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={blankProfileImage} />
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>
            <Text>First Name</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text>{driver.givenName}</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>
            <Text>Last Name</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text>{driver.familyName}</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>
            <Text>DOB</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text>{new Date(driver.dateOfBirth).toLocaleDateString()}</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>
            <Text>Nationality</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text>{driver.nationality}</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>
            <Text>Races</Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Pressable onPress={() => navigation.navigate('Races', { driverId })}>
              <MaterialIcon name="chevron-right" color="#787878" size={24} />
            </Pressable>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 200,
    width: 200,
    marginBottom: 24,
  },
});
