import { HttpService } from '../../../services/http-service.ts';
import { DriversApiResponse, RacesApiResponse } from '../types/api-types.ts';

const httpService = new HttpService({ baseURL: 'https://ergast.com/api/f1' });

export const fetchDrivers = async (page: number, limit: number) => {
  const response = await httpService.get<DriversApiResponse>('/drivers.json', {
    params: {
      limit,
      offset: page * limit,
    },
  });
  return response.data;
};

export const fetchRaces = async (driverId: string) => {
  const response = await httpService.get<RacesApiResponse>(`drivers/${driverId}/results.json`);
  return response.data;
};
