import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import {DataTable} from "react-native-paper";
import axios from 'axios';

export const DriverRaces = ({ route }) => {
  const { driverId } = route.params;
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchRaces = async () => {
      const response = await axios.get(`https://ergast.com/api/f1/drivers/${driverId}/results.json`);
      setRaces(response.data.MRData.RaceTable.Races);
      console.log('races', response.data.MRData.RaceTable.Races);
    };
    fetchRaces();
  }, [driverId]);

  const renderRace = ({ item }) => (
    <View>
      <Text>Race: {item.raceName}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <FlatList
      data={races}
      renderItem={renderRace}
      keyExtractor={(item) => item.round.toString()}
    />
  );
};
