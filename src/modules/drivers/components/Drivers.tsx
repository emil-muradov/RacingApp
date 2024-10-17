import React, { useEffect, useState } from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrivers } from '../state/driversSlice';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

export const Drivers = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const drivers = useSelector((state) => state.drivers.drivers);
  const loading = useSelector((state) => state.drivers.loading);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = React.useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  useEffect(() => {
    dispatch(fetchDrivers(page));
  }, [page]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, drivers.length);

  return (
    <View>
      {loading ? <Text>Loading...</Text> : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{'Name'}</DataTable.Title>
            <DataTable.Title>{'Surname'}</DataTable.Title>
            <DataTable.Title>{'Date of birth'}</DataTable.Title>
            <DataTable.Title>{'Nationality'}</DataTable.Title>
            <DataTable.Title>{'Wiki'}</DataTable.Title>
          </DataTable.Header>
          {drivers.map((driver) =>
            <DataTable.Row key={driver.driverId} onPress={() => navigation.navigate('DriverDetails', { driverId: driver.driverId })}>
              <DataTable.Cell>{driver.givenName}</DataTable.Cell>
              <DataTable.Cell>{driver.familyName}</DataTable.Cell>
              <DataTable.Cell>{new Date(driver.dateOfBirth).toLocaleDateString()}</DataTable.Cell>
              <DataTable.Cell>{driver.nationality}</DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity onPress={() => Linking.openURL(driver.url)}>
                  <Text>{driver.url}</Text>
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          )}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(drivers.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${drivers.length}`}
            numberOfItemsPerPage={itemsPerPage}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
      )}
    </View>
  );
};
