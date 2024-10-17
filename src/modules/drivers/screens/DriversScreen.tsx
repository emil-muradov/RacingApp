import React, { useEffect, useState } from 'react';
import { ScrollView, Pressable, Linking } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { fetchDriversThunk } from '../state/driversSlice';
import { useNavigation } from '@react-navigation/native';
import { DataTable, Text } from 'react-native-paper';
import { useAppDispatch } from '../../../hooks/useAppDispatch.ts';
import { useAppSelector } from '../../../hooks/useAppSelector.ts';
import { RootStackParamList } from '../../../navigation/types.ts';

export const DriversScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Drivers'>>();
  const drivers = useAppSelector((state) => state.drivers.drivers);
  const total = useAppSelector((state) => state.drivers.total);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = React.useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  useEffect(() => {
    dispatch(fetchDriversThunk({ page, limit: itemsPerPage }));
  }, [page, itemsPerPage]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, total);

  return (
    <ScrollView>
      {!!drivers.length && (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title><Text variant="labelLarge">Driver Name</Text></DataTable.Title>
            <DataTable.Title><Text variant="labelLarge">DOB</Text></DataTable.Title>
            <DataTable.Title><Text variant="labelLarge">Nationality</Text></DataTable.Title>
            <DataTable.Title><Text variant="labelLarge">Bio</Text></DataTable.Title>
          </DataTable.Header>
          <>
            {drivers.map((driver) => (
              <DataTable.Row
                key={driver.driverId}
                onPress={() => {
                 navigation.navigate('DriverDetails', { driverId: driver.driverId });
                }}>
                <DataTable.Cell>
                  <Text variant="bodySmall">{driver.givenName + ' ' + driver.familyName}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text variant="bodySmall">{new Date(driver.dateOfBirth).toLocaleDateString()}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text variant="bodySmall">{driver.nationality}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Pressable onPress={async () => {
                    if (await Linking.canOpenURL(driver.url)) {
                      Linking.openURL(driver.url);
                    }
                  }}>
                    <Text numberOfLines={1} variant="bodySmall">{driver.url}</Text>
                  </Pressable>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </>
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(total / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${total}`}
            numberOfItemsPerPage={itemsPerPage}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
      )}
    </ScrollView>
  );
};
