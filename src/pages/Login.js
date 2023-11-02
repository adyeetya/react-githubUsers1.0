import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'
import loginImg from '../images/undraw_secure_login_pdn4.svg'
const Login = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <Wrapper>
      <img src={loginImg} alt="Github User" className="loginImg" />
      <h1>Github User</h1>
      <button onClick={loginWithRedirect} className="btn">
        Login / Sign up
      </button>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  min-height: 100vh;
  /* display: grid;
  place-items: center; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  @media (max-width: 1300px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 80vh;
    .loginImg {
      margin-bottom: 2rem;
      width: 70% !important ;
    }
  }
  .loginImg {
    margin-bottom: 2rem;
    width: 40%;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`
export default Login
