import React from 'react'
import LoginCard from '../components/LoginForm';
import styled from 'styled-components';

const Login = () => {
    return (
        <>
            <Body>
                <LoginCard />
            </Body>
        </>
    )
}


const Body = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    width:100vw;
    background: #F29E38;
    @media screen and (max-width: 750px){
        flex-direction: column;
}
`
export default Login
