import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import axiosInstance from "../../../axios";

export const DriverDetails = ({ route }) => {
  const { driverId } = route.params;
  const [driverDetails, setDriverDetails] = React.useState(null);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      const response = await axiosInstance.get(`f1/drivers/${driverId}.json`);
      setDriverDetails(response.data.MRData.DriverTable.Drivers[0]);
    };
    fetchDriverDetails();
  }, [driverId]);

  if (!driverDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>First Name: {driverDetails.givenName}</Text>
      <Text>Last Name: {driverDetails.familyName}</Text>
      <Text>Date of Birth: {driverDetails.dateOfBirth}</Text>
      <Text>Nationality: {driverDetails.nationality}</Text>
    </View>
  );
};
