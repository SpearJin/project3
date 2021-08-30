import styled from 'styled-components';

const FooterCompoent = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: skyblue;
  color: white;
  font-size: 2.5rem;
`;

function Footer() {
  return <FooterCompoent>Footer 입니다.</FooterCompoent>;
}

export default Footer;
