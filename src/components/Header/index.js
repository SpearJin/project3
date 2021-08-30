import styled from 'styled-components';

const HeaderCompoent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: skyblue;
  color: white;
  font-size: 2.5rem;
`;

function Header() {
  return <HeaderCompoent>헤더 입니다.</HeaderCompoent>;
}

export default Header;
