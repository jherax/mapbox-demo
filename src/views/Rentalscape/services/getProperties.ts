import {gql} from '@apollo/client';

export const GET_PROPERTIES = {
  query: gql`
    query GetProperties($regionId: String!, $nextToken: String) {
      region: getRegion(regionName: $regionId) {
        properties(
          limit: 2000
          nextToken: $nextToken
          filter: {address: {size: {gt: 0}}} #
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
