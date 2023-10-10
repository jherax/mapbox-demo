import styled from 'styled-components';

const Wrapper = styled.section`
  background-color: #fff;
  width: 300px;
  height: 100%;
  padding: 0px;
  box-sizing: border-box;
  border: 0 solid #e5e7eb;
`;

export default function Sidebar() {
  return <Wrapper id='Sidebar'>Sidebar</Wrapper>;
}
