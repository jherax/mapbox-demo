import {useQuery} from '@apollo/client';

import {REGION_DETAILS, RegionDetailsResponse} from './getRegionDetails';
import {REGION_HOUSES, RegionHousesResponse} from './getRegionHouses';
import {REGION_NAMES, RegionNamesResponse} from './getRegionNames';

export function useRegionDetails() {
  const {loading, error, data} = useQuery<RegionDetailsResponse>(
    REGION_DETAILS.query,
    REGION_DETAILS.options,
  );
  return {loading, error, data};
}

export function useRegionHouses() {
  const {loading, error, data} = useQuery<RegionHousesResponse>(
    REGION_HOUSES.query,
    REGION_HOUSES.options,
  );
  return {loading, error, data};
}

export function useRegionNames() {
  const {loading, error, data} = useQuery<RegionNamesResponse>(
    REGION_NAMES.query,
    REGION_NAMES.options,
  );
  return {loading, error, data};
}
