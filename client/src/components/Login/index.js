import axios from 'axios';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const LoginModalWrapper = styled.div`
  display: ${({ isDisplay }) => (isDisplay ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const LoginModal = styled.div`
  width: 80%;
  height: 80%;
  background-color: white;
`;

const SignForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  & > input {
    width: 200px;
    height: 20px;
    margin: 5px 0;
    color: black;
    text-align: center;
  }
`;

const SignInForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  & > input {
    width: 200px;
    height: 20px;
    margin: 5px 0;
    text-align: center;
  }
`;

const SiginButton = styled.button`
  width: 100px;
  height: 20px;
  margin: 0 2px;
  border-radius: 20px;
  background-color: wheat;
  &:hover {
    opacity: 0.8;
  }
`;

function Login({ userName, setUserName }) {
  const [isDisplay, setIsDisplay] = useState(false);
  const [currentLoginState, setCurrentLoginState] = useState('signin');
  const [loginState, setLoginState] = useState('');

  const userIdRef = useRef(null);
  const userNameRef = useRef(null);
  const userPasswordRef = useRef(null);
  const userGenderRef = useRef(null);

  const onHandlerSignUp = async () => {
    console.log(userGenderRef);
    await axios.post('http://localhost:4000/user', {
      id: userIdRef.current.value,
      name: userNameRef.current.value,
      password: userPasswordRef.current.value,
      gender: userGenderRef.current.value,
    });
    setUserName(userNameRef.current.value);
    setLoginState('login');
    setIsDisplay(false);
  };

  const onHandlerLogin = async () => {
    const userInfo = await axios.post('http://localhost:4000/user/login', {
      id: userIdRef.current.value,
      password: userPasswordRef.current.value,
    });
    setUserName(userInfo.data.userName);
    setLoginState('login');
    setIsDisplay(false);
  };

  const wrapperClick = () => {
    setIsDisplay(false);
  };
  // event bubbleing chapter

  const onClickHandler = () => {
    setLoginState(null);
    setUserName(null);
  };

  const signInForm = (
    <SignInForm>
      <input placeholder='아이디' ref={userIdRef} />
      <input placeholder='비밀번호' ref={userPasswordRef} />
      <div>
        <SiginButton
          onClick={onHandlerSignUp}
          onClick={() => setCurrentLoginState('signup')}
        >
          회원가입
        </SiginButton>
        <SiginButton onClick={onHandlerLogin}>로그인</SiginButton>
      </div>
    </SignInForm>
  );

  const signUpForm = (
    <>
      <SignForm>
        <input placeholder='아이디' ref={userIdRef} />
        <input placeholder='닉네임' ref={userNameRef} />
        <input placeholder='비밀번호' ref={userPasswordRef} />
        <label className='sigin-label'>
          성별:
          <input type='radio' name='gender' value='남' ref={userGenderRef} />
          남
          <input type='radio' name='gender' value='여' ref={userGenderRef} />여
        </label>
        <div>
          <SiginButton onClick={onHandlerSignUp}>완료</SiginButton>
          <SiginButton onClick={() => setCurrentLoginState('signin')}>
            취소
          </SiginButton>
        </div>
      </SignForm>
    </>
  );

  const login = <button onClick={() => setIsDisplay(true)}>로그인</button>;

  const loginout = <button onClick={onClickHandler}>로그아웃</button>;

  return (
    <>
      {loginState === 'login' ? loginout : login}
      <LoginModalWrapper isDisplay={isDisplay} onClick={wrapperClick}>
        <LoginModal onClick={(e) => e.stopPropagation()}>
          {currentLoginState === 'signin' ? signInForm : signUpForm}
        </LoginModal>
      </LoginModalWrapper>
    </>
  );
}

export default Login;
