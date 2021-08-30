import styled from 'styled-components';

const FooterCompoent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  & > button {
    width: 50px;
    height: 20px;
    margin: 0 2px;
    border-radius: 4px;
    background-color: seagreen;
    color: white;
  }
`;

function Footer({ setPage }) {
  return (
    <FooterCompoent>
      Footer 입니다.
      <button onClick={() => setPage('list')}>List</button>
      <button onClick={() => setPage('cart')}>Cart</button>
    </FooterCompoent>
  );
}

export default Footer;
