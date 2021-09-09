import { useState } from 'react';
import styled from 'styled-components';
import Login from '../Login';

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

const LoginForm = styled.div`
  display: flex;
  position: relative;
  transform: translateX(100px);
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
`;

function Header() {
  const [userName, setUserName] = useState(null);

  return (
    <HeaderCompoent>
      헤더 입니다.
      {userName && <Name>{userName}님 환영합니다.</Name>}
      <Login userName={userName} setUserName={setUserName} />
    </HeaderCompoent>
  );
}

export default Header;
