import {gql} from '@apollo/client';

export const REGION_NAMES: ApolloClientQueryOptions = {
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
  options: {
    context: {
      clientName: 'RENTALSCAPE',
    },
  },
} as const;

export type RegionNamesResponse = {
  listRegions: {
    items: Array<{
      name: string;
      regionShortName: string;
    }>;
  };
};
