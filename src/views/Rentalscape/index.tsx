import styled from 'styled-components';

import Mapbox from '../../components/Mapbox';
import Sidebar from '../../components/Sidebar';

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
  return (
    <Wrapper data-testid='main_wrapper'>
      <Sidebar></Sidebar>
      <Mapbox></Mapbox>
    </Wrapper>
  );
}

export default Rentalscape;
