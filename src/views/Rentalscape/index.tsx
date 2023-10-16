import {useQuery} from '@apollo/client';
import styled from 'styled-components';

import Mapbox from '../../components/Mapbox';
import Sidebar, {type SidebarProps} from '../../components/Sidebar';
import logger from '../../utils/logger';
import setHrefValue from '../../utils/setHrefValue';
import ResolveView from '../ResolveView';
import {
  REGION_PROPERTIES,
  type RegionPropertiesResponse,
} from './services/getProperties';
import {
  REGION_CONFIG,
  type RegionConfigResponse,
} from './services/getRegionConfig';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: start;
  align-items: stretch;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

function Rentalscape() {
  const regionConfig = useQuery<RegionConfigResponse>(REGION_CONFIG.query, {
    variables: REGION_CONFIG.variables,
  });

  const regionProperties = useQuery<RegionPropertiesResponse>(
    REGION_PROPERTIES.query,
    {variables: REGION_PROPERTIES.variables},
  );

  logger.info({
    config: {loading: regionConfig.loading, data: regionConfig.data},
    properties: {
      loading: regionProperties.loading,
      data: regionProperties.data,
    },
  });

  const firstItem = regionConfig.data?.region?.items[0];
  const sidebarProps: SidebarProps = {
    regionLogo: firstItem?.logo ?? '',
    legends: (firstItem?.legends ?? []).map(item => {
      return {
        count: item.count,
        label: item.formattedText.trim(),
        bulletColor: item.colorHex,
      };
    }),
    links: (firstItem?.links ?? []).map(item => {
      return {
        label: item.label.trim(),
        showValue: item.displayValue.trim(),
        rawValue: setHrefValue({type: item.type, value: item.value}),
      };
    }),
  };

  return (
    <Wrapper>
      <ResolveView loading={regionConfig.loading} error={regionConfig.error}>
        <Sidebar {...sidebarProps}></Sidebar>
        <Mapbox></Mapbox>
      </ResolveView>
    </Wrapper>
  );
}

export default Rentalscape;
