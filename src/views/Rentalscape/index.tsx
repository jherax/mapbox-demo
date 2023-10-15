import {useQuery} from '@apollo/client';
import styled from 'styled-components';

import Mapbox from '../../components/Mapbox';
import Sidebar, {type SidebarProps} from '../../components/Sidebar';
import logger from '../../utils/logger';
import setHrefValue from '../../utils/setHrefValue';
import ResolveView from '../ResolveView';
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

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
`;

function Rentalscape() {
  const {data, loading, error} = useQuery<RegionConfigResponse>(
    REGION_CONFIG.query,
    {
      variables: REGION_CONFIG.variables,
    },
  );

  logger.info({loading: loading, data: data, error: error});
  const firstItem = data?.region?.items[0];
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
      <ResolveView loading={loading} error={error}>
        <Sidebar {...sidebarProps}></Sidebar>
        <Mapbox></Mapbox>
      </ResolveView>
    </Wrapper>
  );
}

export default Rentalscape;
