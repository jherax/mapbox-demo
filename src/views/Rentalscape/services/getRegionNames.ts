import {gql} from '@apollo/client';

export const LIST_REGIONS = {
  query: gql`
    query GetRegionNames {
      listRegions {
        items {
          name
          regionShortName
        }
      }
    }
  `,
  operationName: 'GetRegionNames',
};
