import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { DataTable, Text } from 'react-native-paper';
import { fetchRacesThunk, selectRacesById } from '../state/racesSlice.ts';
import { useAppDispatch } from '../../../hooks/useAppDispatch.ts';
import { useAppSelector } from '../../../hooks/useAppSelector.ts';
import { RootStackParamList } from '../../../navigation/types.ts';

export const RacesScreen = ({ route }: NativeStackScreenProps<RootStackParamList, 'Races'>) => {
  const { driverId } = route.params;
  const dispatch = useAppDispatch();
  const { races } = useAppSelector(state => selectRacesById(state, driverId)) || {};

  useEffect(() => {
   dispatch(fetchRacesThunk(driverId));
  }, [driverId]);

  if (!races) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>);
  }

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <Text variant="labelLarge">Race</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text variant="labelLarge">Date</Text>
          </DataTable.Title>
        </DataTable.Header>
          {races.map(((race, i) => (
            <DataTable.Row key={race.raceName + i}>
              <DataTable.Cell>{race.raceName}</DataTable.Cell>
              <DataTable.Cell>{new Date(race.date).toLocaleDateString()}</DataTable.Cell>
            </DataTable.Row>
          )))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
