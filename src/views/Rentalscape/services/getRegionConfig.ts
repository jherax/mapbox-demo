import {gql} from '@apollo/client';

export const REGION_CONFIG = {
  query: gql`
    query GetRegionConfig($regionShortName: String!) {
      region: regionByShortName(regionShortName: $regionShortName) {
        items {
          regionName
          name
          logo
          misc
          geoJson
          legends {
            ...LegendData
          }
          statistics {
            ...StatData
          }
          links {
            ...LinkData
          }
        }
      }
    }
    fragment LegendData on Legend {
      colorHex
      count
      formattedText
      tooltip
      propertyType
    }
    fragment StatData on RegionStatistic {
      type
      value
    }
    fragment LinkData on Link {
      displayValue
      label
      tooltip
      type
      value
    }
  `,
  variables: {
    regionShortName: 'placer-ca',
  },
  operationName: 'GetRegionConfig',
};

export type RegionConfigResponse = {
  region: {
    items: Array<{
      regionName: string;
      name: string;
      logo: string;
      misc: string;
      geoJson: string;

      legends: Array<{
        colorHex: string;
        count: number;
        formattedText: string;
        tooltip: string;
        propertyType: string;
      }>;

      links: Array<{
        displayValue: string;
        label: string;
        tooltip: string;
        type: string;
        value: string;
      }>;
    }>;
  };
};
