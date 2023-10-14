import {useQuery} from '@apollo/client';
import styled from 'styled-components';

import Mapbox from '../../components/Mapbox';
import Sidebar from '../../components/Sidebar';
import logger from '../../utils/logger';
import ResolveView from '../ResolveView';
import {REGION_CONFIG} from './services/getRegionConfig';

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
  const {data, loading, error} = useQuery(REGION_CONFIG.query, {
    variables: REGION_CONFIG.variables,
  });

  logger.info({loading: loading, data: data, error: error});

  return (
    <Wrapper>
      <ResolveView loading={loading} error={error}>
        <Sidebar></Sidebar>
        <Mapbox></Mapbox>
      </ResolveView>
    </Wrapper>
  );
}

export default Rentalscape;
