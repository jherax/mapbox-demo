import styled from 'styled-components';

import Mapbox from '../../components/Mapbox';
import Sidebar, {type SidebarProps} from '../../components/Sidebar';
import logger from '../../utils/logger';
import setHrefValue from '../../utils/setHrefValue';
import trim from '../../utils/trim';
import ResolveView from '../ResolveView';
import {useRegionDetails, useRegionHouses} from './services/hooks';

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
  const regionDetails = useRegionDetails();
  const regionHouses = useRegionHouses();

  logger.info({
    details: {loading: regionDetails.loading, data: regionDetails.data},
    houses: {loading: regionHouses.loading, data: regionHouses.data},
  });

  const firstItem = regionDetails.data?.region?.items[0];
  const sidebarProps: SidebarProps = {
    regionLogo: firstItem?.logo ?? '',
    legends: (firstItem?.legends ?? []).map(item => {
      return {
        count: item.count,
        label: trim(item.formattedText),
        bulletColor: item.colorHex,
      };
    }),
    links: (firstItem?.links ?? []).map(item => {
      return {
        label: trim(item.label),
        showValue: trim(item.displayValue),
        rawValue: setHrefValue({type: item.type, value: item.value}),
      };
    }),
  };

  return (
    <Wrapper>
      <ResolveView loading={regionDetails.loading} error={regionDetails.error}>
        <Sidebar {...sidebarProps}></Sidebar>
        <Mapbox></Mapbox>
      </ResolveView>
    </Wrapper>
  );
}

export default Rentalscape;
