// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

/**  Автокомплит */
export type TAviakassaLegacyAviaAutocompleteResult = {
  list: IAviakassaAviaSearchFormAirport[];
};

interface IAirport {
  iata: string;
  name?: string;
}

interface IAviakassaAviaSearchFormAirport extends IAirport {
  airportAggregationIata?: string;
  city?: IAirport | undefined;
  country?: IAirport;
  isDefault?: boolean;
  latitude?: number;
  longitude?: number;
}


export type TAviakassaGetAirportsAutocompleteParams = {
  /** @description Строка для поиска аэопортов и городов с автодополнением по названию или IATA */
  part?: string;
};

export const objectToFlatKeyValPair = (
  data: any[] | Record<string, any>,
  parentKey: string | null = null,
) => {
  // TODO: improve performance
  let result = {};

  Object.keys(data).forEach((key) => {
    let constructedKey = key;

    if (parentKey) {
      constructedKey = `${parentKey}[${key}]`;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = data[key];

    if (
      (isObject(value) || isArray(value)) &&
      !(value instanceof Date) &&
      !(value instanceof File)
    ) {
      result = {
        ...result,
        ...objectToFlatKeyValPair(value, constructedKey),
      };
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result[constructedKey] = data[key];
    }
  });

  return result;
};

// Define a service using a base URL and expected endpoints
export const travelApi = createApi({
  reducerPath: 'travelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://travel.alfabank.ru/api/' }),
  endpoints: (build) => ({
    autocomplete: build.query<
      {data: TAviakassaLegacyAviaAutocompleteResult},
      TAviakassaGetAirportsAutocompleteParams
    >({
      query: params => ({
        params,
        method: 'get',
        url: '/v4/avia/airports',
      }),
    }),
    getSearchRecommendations: build.query({
      query: (params) => ({
        params: objectToFlatKeyValPair(params),
        method: 'get',
        url: '/v4/avia/search/get-recommendations-by-intervals',
      }),
    }),
  }),
});

export const { useAutocompleteQuery, useGetSearchRecommendationsQuery } = travelApi;