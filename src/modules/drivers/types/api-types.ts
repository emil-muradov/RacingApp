export type Driver = {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};

export type Race = {
  raceName: string;
  date: string;
  season: string;
  url: string;
};

type BaseResponseAttributes = {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
};

export type DriversApiResponse = {
  MRData: BaseResponseAttributes &
    {
      DriverTable: {
        Drivers: Driver[];
      };
    };
};

export type RacesApiResponse = {
  MRData: BaseResponseAttributes & {
    RaceTable: {
      driverId: string;
      Races: Race[];
    };
  };
};
