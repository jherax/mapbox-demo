import {gql} from '@apollo/client';

export const REGION_PROPERTIES = {
  query: gql`
    query GetProperties($regionId: String!, $nextToken: String) {
      region: getRegion(regionName: $regionId) {
        properties(
          limit: 10
          nextToken: $nextToken
          filter: {address: {size: {gt: 0}}}
        ) {
          nextToken
          items {
            ...PropertyFragment
          }
        }
      }
    }
    fragment PropertyFragment on Property {
      deckardId
      displayInfo {
        label
        value
      }
      isLicensed
      types
      geo {
        lat
        lng
      }
      geo5
      address
      contact {
        ...PropertyContactInfo
      }
      licenses {
        items {
          ...LicenseInfo
        }
      }
      listings {
        items {
          ...ListingInfo
        }
      }
    }
    fragment PropertyContactInfo on PropertyContact {
      name
      phone
      email
      company
    }
    fragment LicenseInfo on License {
      license_id
      propertyLicensesId
      num_bedrooms
      num_vehicles
      occupancy
      status
      contacts {
        ...LicenseContactFragment
      }
    }
    fragment LicenseContactFragment on LicenseContact {
      type
      name
      phone
      email
      company
    }
    fragment ListingInfo on Listing {
      active
      verified
      imageUrls
    }
  `,
  variables: {
    regionId: 'ca-placer',
  },
  operationName: 'GetProperties',
};

export type RegionPropertiesResponse = {
  region: {
    properties: {
      nexToken: string;
      items: Array<{
        deckardId: string;
        displayInfo: Array<{
          label: string;
          value: string;
        }>;
        isLicensed: boolean;
        types: string[];
        geo: {
          lat: number;
          lng: number;
        };
        geo5: string;
        address: string;
      }>;
    };
  };
};
